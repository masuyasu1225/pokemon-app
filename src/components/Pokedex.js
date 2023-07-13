import { useEffect, useState } from "react";
import "./Pokedex.css";
import Card from "./Card/Card";
import {
  getAbilityJPName,
  getAllPokemon,
  getPokemon,
  getPokemonJPName,
} from "../utils/pokemon.js";

function Pokedex() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        // 各ポケモンの詳細データを取得
        let pokemonRecord = await getPokemon(pokemon.url);

        // 日本語名を取得
        let nameJP = await getPokemonJPName(pokemonRecord.species.url);

        // 日本語名を追加
        pokemonRecord.nameJP = nameJP;

        // タイプの日本語名を取得
        let typesJP = await Promise.all(
          pokemonRecord.types.map(async (type) => {
            let typeDetail = await getPokemon(type.type.url);
            let nameJP = typeDetail.names.find(
              (name) => name.language.name === "ja"
            ).name;
            return nameJP;
          })
        );

        // タイプの日本語名を追加
        pokemonRecord.typesJP = typesJP;

        // 特性の日本語名を取得
        let abilitiesJP = await Promise.all(
          pokemonRecord.abilities.map(async (ability) => {
            let abilityNameJP = await getAbilityJPName(ability.ability.url);
            return {
              ...ability,
              ability: {
                ...ability.ability,
                name: abilityNameJP,
              },
            };
          })
        );
        pokemonRecord.abilities = abilitiesJP;

        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };
  const handlePrevPage = async () => {
    if (!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return (
                  <Card
                    key={i}
                    pokemon={pokemon}
                    pokemonNameJP={pokemon.nameJP}
                  />
                );
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Pokedex;
