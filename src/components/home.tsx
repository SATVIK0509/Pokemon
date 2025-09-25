import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import SearchBar from "./searchBar";
import ShimmerUI from "./shimmerUI";
import Favorites from "./favourites";
import { useQueries, useQuery } from "@tanstack/react-query";
import fetchPokemonList from "../api/fetchPokemonList";
import fetchPokemonDetail from "../api/fetchPokemonDetails";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";

export default function Home() {
  const [currPage, setCurrPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [height, setHeight] = useState<number>(0);
  const [filter, setFilter] = useState<string>("");

  function handleChange(event: SelectChangeEvent) {
    const currFilter = event.target.value;
    setFilter(currFilter);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon-list", currPage],
    queryFn: fetchPokemonList,
    staleTime: 1000 * 60 * 5,
  });

  const results = useQueries({
    queries:
      data?.results?.map((curr: any, idx: number) => ({
        queryKey: ["individual-Pokemon", curr?.url],
        queryFn: fetchPokemonDetail,
        staleTime: 1000 * 60 * 5,
      })) ?? [],
  });

  const isDetailsLoading = results.some((r) => r.isLoading);

  const completeResponse = results
    .filter((r) => r.isSuccess && r.data)
    .map((r) => r.data);

  const filteredPokemon = completeResponse.filter((p: any) => {
    const matchesName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHeight = !filter || p.height <= Number(filter);
    return matchesName && matchesHeight;
  });

  return (
    <div className="container mx-auto">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Favorites />

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
            <MenuItem value={""}>No Filter</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isLoading || isDetailsLoading || !filteredPokemon ? (
        <ShimmerUI />
      ) : (
        <div className="cards flex flex-wrap gap-6 p-2 ml-2 mr-2 mt-4 ">
          {filteredPokemon?.map((curr: any) => (
            <Link to={`/pokemon/${curr?.id}`} key={curr?.id}>
              <PokemonCard currPokemonData={curr} />
            </Link>
          ))}
        </div>
      )}
      <Pagination currPage={currPage} setCurrPage={setCurrPage} />
    </div>
  );
}
