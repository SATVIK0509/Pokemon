import { Route, Routes } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Home from "./Home";
import Pokemon from "./Pokemon";
import Whishlist from "./Whishlist";


export default function App(){

    return(
        <div className="">
        
        <Header/>

        <Routes>

            <Route path="/" element={<Home/>} />
            
            <Route path="/pokemon/:id" element={<Pokemon/>} />

            <Route path="/pokemon/favourites" element={<Whishlist/>} />
        </Routes>
        
        </div>
    )
}