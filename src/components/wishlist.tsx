import { Link } from "react-router-dom";
import useWishlistStore from "../store/wishlistStore";
import PokemonCard from "./pokemonCard";
import { useOutletContext } from "react-router-dom";

type SearchContext = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function Whishlist() {
  console.log("wishlist mounted");
  const favs = useWishlistStore((state) => state.fav_pokemon);
  const { searchTerm, setSearchTerm } = useOutletContext<SearchContext>();

  const filteredPokemon = favs?.filter((p: any) => {
    return p.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (filteredPokemon.length === 0) {
    return (
      <div className="text-center text-2xl mt-10 font-bold text-gray-600 ">
        No favorites yet! Add Some
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6 drop-shadow-lg">
        Favourites
      </h2>
      <div className="flex flex-wrap gap-6 p-2 ml-10 mt-4">
        {filteredPokemon?.map((pokemon) => (
          <Link
            key={pokemon.id}
            to={`/pokemon/${pokemon.id}`}
            state={{ pokemon }}
          >
            <PokemonCard currPokemonData={pokemon} />
          </Link>
        ))}
      </div>
    </div>
  );
}
