import { useEffect, useRef, useState } from "react";
import PokemonCard from "./pokemonCard";
import { Link } from "react-router-dom";
import ShimmerUI from "./shimmerUI";
import { useInfiniteQuery, useQueries } from "@tanstack/react-query";
import fetchPokemonDetail from "../api/fetchPokemonDetails";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import { STALE_TIME } from "../constants/api";
import fetchInfinitePokemonList from "../api/fetchInfinitePokemonList";
import { useOutletContext } from "react-router-dom";

type SearchContext = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function infiniteScrolling() {
  const { searchTerm, setSearchTerm } = useOutletContext<SearchContext>();
  const [filter, setFilter] = useState<string>("");

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  function handleChange(event: SelectChangeEvent) {
    setFilter(event.target.value);
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["pokemon-list"],
      queryFn: fetchInfinitePokemonList,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.next ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
      staleTime: STALE_TIME,
    });

  if (status === "error") throw new Error("something went wrong");

  const allPokemons = data?.pages.flatMap((page) => page.results) ?? [];

  const results = useQueries({
    queries:
      allPokemons?.map((curr: any) => ({
        queryKey: ["individual-Pokemon", curr?.url] as [string, string],
        queryFn: fetchPokemonDetail,
        staleTime: STALE_TIME,
      })) ?? [],
  });

  const isDetailsLoading =
    !results || results.length === 0 || results.some((r) => r.isLoading);

  const completeResponse = results
    .filter((r) => r.isSuccess && r.data)
    .map((r) => r.data);

  const filteredPokemon = completeResponse.filter((p: any) => {
    const matchesName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHeight = !filter || p.height <= Number(filter);
    return matchesName && matchesHeight;
  });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          fetchNextPage();
          console.log("fetching");
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  console.log("isFetchingNextPage:", isFetchingNextPage);

  return (
    <div className="container mx-auto">
      {/* <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}

      <Box sx={{ minWidth: 60 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Height</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Height"
            onChange={handleChange}
          >
            <MenuItem value={"5"}>Upto Five</MenuItem>
            <MenuItem value={"10"}>Upto Ten</MenuItem>
            <MenuItem value={"15"}>Upto Fifteen</MenuItem>
            <MenuItem value={""}>Clear Filter</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {status === "pending" || isDetailsLoading ? (
        <ShimmerUI />
      ) : (
        <div className="cards flex flex-wrap gap-6 p-2 ml-2 mr-2 mt-4">
          {filteredPokemon.length === 0 ? (
            <div className="text-3xl">
              Not Found🥲! Try to Search Something Different
            </div>
          ) : (
            filteredPokemon.map((curr: any) => (
              <Link to={`/pokemon/${curr?.id}`} key={curr?.id}>
                <PokemonCard currPokemonData={curr} />
              </Link>
            ))
          )}
        </div>
      )}

      <div ref={loadMoreRef} className="h-20 flex justify-center items-center">
        {isFetchingNextPage && (
          <p className="text-gray-500 text-3xl">Loading...</p>
        )}
        {!hasNextPage && (
          <p className="text-gray-500">No more Pokemon exists </p>
        )}
      </div>
    </div>
  );
}
