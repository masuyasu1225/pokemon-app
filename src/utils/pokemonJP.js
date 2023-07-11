const [pokemonName, setPokemonName] = useState([]);

//複数個になると変わる部分
let pokemonNameDetail = pokemon.species.url;

const loadPokemonName = async (data) => {
  let response = await fetch(data);
  let result = await response.json();
  let jaName = result.names.find((name) => name.language.name === "ja").name;
  setPokemonName(jaName);
};

useEffect(() => {
  loadPokemonName(pokemonNameDetail);
}, []);

return (
  <div className="card">
    <h4 className="cardNames">{pokemonName}</h4>
  </div>
);
