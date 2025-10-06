import { Link } from "react-router-dom";
import NavButton from "./navButton";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center mx-8 mt-6 ml-10">
      <div className="flex gap-10">
        <Link to={"/"}>
          <NavButton nav={"Home"} />
        </Link>
        <Link to={"/pokemon/favourites"}>
          <NavButton nav={"Favourites"} />
        </Link>
        <Link to={"/pokemon/infinite-scroll"}>
          <NavButton nav={"Infinite Scroll"} />
        </Link>
      </div>
    </nav>
  );
}
