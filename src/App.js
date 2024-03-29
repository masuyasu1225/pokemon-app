import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
import Pokedex from "./components/Pokedex";
import PokedexKanto from "./components/PokedexKanto";
import PokedexJohto from "./components/PokedexJohto";
import PokedexHoenn from "./components/PokedexHoenn";
import PokedexSinnoh from "./components/PokedexSinnoh";
import PokedexUnova from "./components/PokedexUnova";
import PokemonStatus from "./components/PokemonStatus";
import SearchPokemon from "./components/SearchPokemon";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Pokedex />}></Route>
        {/* <Route path="/pokedex" element={<Pokedex />}></Route> */}
        <Route path="/pokedex_kanto" element={<PokedexKanto />}></Route>
        <Route path="/pokedex_johto" element={<PokedexJohto />}></Route>
        <Route path="/pokedex_hoenn" element={<PokedexHoenn />}></Route>
        <Route path="/pokedex_sinnoh" element={<PokedexSinnoh />}></Route>
        <Route path="/pokedex_unova" element={<PokedexUnova />}></Route>
        <Route path="/pokemon/:pokemonId" element={<PokemonStatus />}></Route>
        <Route path="/search_pokemon" element={<SearchPokemon />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
