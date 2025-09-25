import { Link } from "react-router-dom";
import useWishlistStore from "../store/wishlistStore";
import PokemonCard from "./PokemonCard";

export default function Whishlist(){

    console.log("wishlist mounted")
    const favs = useWishlistStore((state) => state.fav_pokemon);

    if (favs.length === 0) {
        return (
        <div className="text-center mt-10 text-lg text-gray-600">
            No favorites yet!
            <h2> Favorites </h2>
        </div>
        );
    }

    return(

        <div>
            <h2 className="text-3xl font-bold text-center text-yellow-600 mb-6 drop-shadow-lg"> Favourites  </h2>
            <div className="flex flex-wrap gap-6 p-2 ml-10 mt-4">
                {
                    favs?.map((pokemon) => (
                        <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`} state={{ pokemon }}>
                        <PokemonCard currPokemonData={pokemon} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}