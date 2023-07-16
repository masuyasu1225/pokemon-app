import { useEffect, useState } from "react";
import "./Pokedex.css";
import Card from "./Card/Card";
import {
  getAbilityJPName,
  getAllPokemon,
  getPokemon,
  getPokemonJPName,
} from "../utils/pokemon.js";

function SearchPokemon() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon?limit=1000";
  // const [initialURL, setInitialURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [searchType, setSearchType] = useState({});
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);

  useEffect(() => {
    // isSearchButtonClickedがtrueの時のみ、検索を実行します
    if (isSearchButtonClicked) {
      setIsSearchButtonClicked(false); // 検索後は、isSearchButtonClickedを再びfalseに設定します
    }
  }, [isSearchButtonClicked]); // 依存配列にisSearchButtonClickedを追加します

  const fetchPokemonData = async () => {
    setLoading(true);
    //全てのポケモンデータを取得
    // setInitialURL("https://pokeapi.co/api/v2/pokemon/?limit=1000");
    let res = await getAllPokemon(initialURL);
    //各ポケモンの詳細なデータを取得
    await loadPokemon(res.results);
    setNextURL(res.next);
    setPrevURL(res.previous);
    setLoading(false);
  };

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

    console.log("_pokemonData before filtering: ", _pokemonData);
    _pokemonData = _pokemonData.filter((pokemon) => {
      // 名前でフィルタリング
      if (
        searchName &&
        searchName !== "" &&
        !pokemon.nameJP.includes(searchName)
      ) {
        return false;
      }

      // 番号でフィルタリング
      if (
        searchNumber &&
        searchNumber !== "" &&
        pokemon.id !== parseInt(searchNumber, 10)
      ) {
        return false;
      }

      // タイプでフィルタリング
      if (
        searchType &&
        Object.keys(searchType).length !== 0 &&
        !pokemon.typesJP.includes(searchType)
      ) {
        return false;
      }

      return true;
    });

    console.log("_pokemonData after filtering: ", _pokemonData);

    setPokemonData(_pokemonData);
  };
  console.log("pokemonData: ", pokemonData);

  // const handleNextPage = async () => {
  //   setLoading(true);
  //   let data = await getAllPokemon(nextURL);
  //   await loadPokemon(data.results);
  //   setNextURL(data.next);
  //   setPrevURL(data.previous);
  //   setLoading(false);
  // };

  // const handlePrevPage = async () => {
  //   if (!prevURL) return;

  //   setLoading(true);
  //   let data = await getAllPokemon(prevURL);
  //   await loadPokemon(data.results);
  //   // setNextURL(data.next);
  //   // setPrevURL(data.previous);
  //   setLoading(false);
  // };

  const handleSearch = () => {
    // Fetch all pokemon data again
    fetchPokemonData();
    // handleSearch関数内で、isSearchButtonClickedをtrueに設定します
    setIsSearchButtonClicked(true);
  };

  const handleInputChange = (event, setSearchFunc) => {
    setSearchFunc(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setSearchType((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  return (
    <>
      <div className="App">
        <div className="searchContainer">
          <input
            type="text"
            placeholder="名前を入力"
            onChange={(e) => handleInputChange(e, setSearchName)}
          />
          <input
            type="text"
            placeholder="番号を入力"
            onChange={(e) => handleInputChange(e, setSearchNumber)}
          />
          <label>
            <input
              type="checkbox"
              name="Fire"
              onChange={handleCheckboxChange}
            />
            Fire
          </label>
          <label>
            <input
              type="checkbox"
              name="Water"
              onChange={handleCheckboxChange}
            />
            Water
          </label>
          <button onClick={handleSearch}>検索</button>
        </div>
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
            {/* <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div> */}
          </>
        )}
      </div>
    </>
  );
}

export default SearchPokemon;
