import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pokedex from "./components/Pokedex";
import PokedexKanto from "./components/PokedexKanto";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pokedex" element={<Pokedex />}></Route>
        <Route path="/pokedex_kanto" element={<PokedexKanto />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
