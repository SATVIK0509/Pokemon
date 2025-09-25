import { Link } from "react-router-dom";

export default function Favorites() {
  return (
    <>
      <Link to={"/pokemon/favourites"}>
        <span className="ml-10 mt-10 p-2 bg-red-300 border border-black">
          Favourites
        </span>
      </Link>
    </>
  );
}
