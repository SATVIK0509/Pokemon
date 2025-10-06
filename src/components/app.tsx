import { Route, Routes } from "react-router-dom";
import "../index.css";
import Header from "./header";
import Home from "./home";
import Pokemon from "./pokemon";
import Whishlist from "./wishlist";
import InfinitScrolling from "./infiniteScrolling";
import Navbar from "./navbar";
import Layout from "./layout";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/pokemon/favourites" element={<Whishlist />} />

          <Route
            path="/pokemon/infinite-scroll"
            element={<InfinitScrolling />}
          />
        </Route>

        <Route path="/pokemon/:id" element={<Pokemon />} />
      </Routes>
    </div>
  );
}
