// not using this store now after using React-Query

import { create } from "zustand";
import type { PokemonDataInterface } from "../types/pokemonDataInterface";

interface APIStore {
  api_data: PokemonDataInterface[];
  total_pokemon: number;

  setApiData: (currApiData: PokemonDataInterface[]) => void;
  getApiData: (id: number) => PokemonDataInterface | undefined;
  setTotalPokemon: (total: number) => void;
}

const useAPIStore = create<APIStore>((set, get) => ({
  api_data: [],
  total_pokemon: 0,

  setApiData: (currApiData) => {
    set({ api_data: currApiData });
  },

  getApiData: (id) => {
    return get().api_data.find((api) => api.id === id);
  },

  setTotalPokemon: (total) => {
    set({ total_pokemon: total });
  },
}));

export default useAPIStore;
