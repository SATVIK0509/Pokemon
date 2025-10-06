import { useEffect, useState } from "react";
import PokemonCard from "./pokemonCard";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import ShimmerUI from "./shimmerUI";
import { useQueries, useQuery } from "@tanstack/react-query";
import fetchPokemonList from "../api/fetchPokemonList";
import fetchPokemonDetail from "../api/fetchPokemonDetails";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import { STALE_TIME } from "../constants/api";
import { useOutletContext } from "react-router-dom";

type SearchContext = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function Home() {
  const [currPage, setCurrPage] = useState<number>(1);
  const { searchTerm, setSearchTerm } = useOutletContext<SearchContext>();
  const [filter, setFilter] = useState<string>("");

  function handleChange(event: SelectChangeEvent) {
    const currFilter = event.target.value;
    setFilter(currFilter);
  }

  const { data: list, isLoading: isListLoading } = useQuery({
    queryKey: ["pokemon-list", currPage],
    queryFn: fetchPokemonList,
    staleTime: STALE_TIME,
  });

  console.log("data", list);
  console.log("called");
  const results = useQueries({
    queries:
      list?.results?.map((curr: any) => ({
        queryKey: ["individual-Pokemon", curr?.url] as [string, string],
        queryFn: fetchPokemonDetail,
        staleTime: STALE_TIME,
        enabled: !!list,
      })) ?? [],
  });

  console.log("results", results);

  const isDetailsLoading =
    !results || results.length === 0 || results.some((r) => r.isLoading);

  const completeResponse = results
    .filter((r) => r.isSuccess && r.data)
    .map((r) => r.data);

  const filteredPokemon = completeResponse?.filter((p: any) => {
    const matchesName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHeight = !filter || p.height <= Number(filter);
    return matchesName && matchesHeight;
  });

  console.log(filteredPokemon);
  console.log(isListLoading, isDetailsLoading);
  console.log(!filteredPokemon);

  return (
    <div className="container mx-auto">
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
            <MenuItem value={"10"}>Upto Ten </MenuItem>
            <MenuItem value={"15"}>Upto Fifteen</MenuItem>
            <MenuItem value={""}>Clear Filter</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isListLoading || isDetailsLoading || !filteredPokemon ? (
        <ShimmerUI />
      ) : (
        <div className="cards flex flex-wrap gap-6 p-2 ml-2 mr-2 mt-4 ">
          {filteredPokemon.length === 0 ? (
            <div className="text-3xl">
              Not Found🥲! Try to Search Something Different
            </div>
          ) : (
            filteredPokemon?.map((curr: any) => (
              <Link to={`/pokemon/${curr?.id}`} key={curr?.id}>
                <PokemonCard currPokemonData={curr} />
              </Link>
            ))
          )}
        </div>
      )}
      <Pagination currPage={currPage} setCurrPage={setCurrPage} />
    </div>
  );
}
