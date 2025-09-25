import Detailing from "./detailing";
import useWishlistStore from "../store/wishlistStore";

export default function PokemonCard({ currPokemonData }: any) {
  const togglePokemon = useWishlistStore((state) => state.togglePokemon);
  const favs = useWishlistStore((state) => state.fav_pokemon);
  const added = favs.some((p) => p.id === currPokemonData.id);

  return (
    <div className="card h-72 w-72 p-3 border cursor-pointer bg-blue-300 shadow-md rounded-xl hover:shadow-xl hover:scale-105 transition-transform duration-200">
      <button
        className={`px-3 py-1 text-sm font-semibold rounded-md shadow ${
          added ? "bg-red-500 text-white" : "bg-white text-black"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          togglePokemon(currPokemonData);
          console.log(currPokemonData.name, "Added fav");
        }}
      >
        {added ? "❤️" : "🤍"}
      </button>

      <h3 className="text-xl font-bold text-center text-yellow-600 drop-shadow-md capitalize ">
        {currPokemonData.name}
      </h3>
      <figure className=" h-40 w-full">
        <img
          className="w-auto h-full mx-auto "
          src={currPokemonData?.sprites?.other?.showdown?.front_default}
          alt="Loading"
        />
      </figure>

      <div className="text-center px-2 py-1 mx-1 my-2 rounded-4xl bg-violet-500 text-sm capitalize text-white">
        <span className="font-bold">Types: </span>
        {currPokemonData?.types
          ?.map((currType: any) => currType?.type?.name)
          .join(", ")}
      </div>

      <div className="flex justify-between ">
        <Detailing
          detail={"speed"}
          data={currPokemonData?.stats[5].base_stat}
        />
        <Detailing detail={"height"} data={currPokemonData?.height} />
        <Detailing detail={"weight"} data={currPokemonData?.weight} />
      </div>
    </div>
  );
}
