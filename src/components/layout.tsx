// Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import SearchBar from "./searchBar";
import Navbar from "./navbar";
import { useState } from "react";
import Header from "./header";

export default function Layout() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <Header />
      <Navbar />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={{ searchTerm, setSearchTerm }} />
    </div>
  );
}
