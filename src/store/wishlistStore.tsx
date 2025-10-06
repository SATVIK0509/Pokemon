import { create } from "zustand";
import type { PokemonDataInterface } from "../types/pokemonDataInterface";

interface WishlistStore {
  fav_pokemon: PokemonDataInterface[];

  addPokemon: (pokemon: PokemonDataInterface) => void;
  removePokemon: (id: number) => void;
  togglePokemon: (pokemon: PokemonDataInterface) => void;
}

const useWishlistStore = create<WishlistStore>((set, get) => ({
  fav_pokemon: [],

  addPokemon: (pokemon) => {
    const current = get().fav_pokemon;
    if (!current.find((p) => p.id === pokemon.id)) {
      set({ fav_pokemon: [...current, pokemon] });
    }
  },

  removePokemon: (id) => {
    const current = get().fav_pokemon;
    set({ fav_pokemon: current.filter((p) => p.id !== id) });
  },

  togglePokemon: (pokemon) => {
    const current = get().fav_pokemon;
    const exists = current.find((p) => p.id === pokemon.id);
    if (exists) {
      set({ fav_pokemon: current.filter((p) => p.id !== pokemon.id) });
    } else {
      set({ fav_pokemon: [...current, pokemon] });
    }
  },
}));

export default useWishlistStore;
