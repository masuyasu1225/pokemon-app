import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAbilityJPName,
  getPokemon,
  getPokemonJPName,
  getStatJPName,
} from "../utils/pokemon.js";
import "./PokemonStatus.css";

const PokemonStatus = () => {
  const [pokemon, setPokemon] = useState(null);
  const { pokemonId } = useParams();

  useEffect(() => {
    const fetchPokemonData = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
      const pokemonRecord = await getPokemon(url);

      // Get the Japanese name
      const nameJP = await getPokemonJPName(pokemonRecord.species.url);
      pokemonRecord.nameJP = nameJP;

      // Get the Japanese name for each type
      const typesJP = await Promise.all(
        pokemonRecord.types.map(async (type) => {
          const typeDetail = await getPokemon(type.type.url);
          const nameJP = typeDetail.names.find(
            (name) => name.language.name === "ja"
          ).name;
          return nameJP;
        })
      );
      pokemonRecord.typesJP = typesJP;

      // Get the Japanese name for each ability
      const abilitiesJP = await Promise.all(
        pokemonRecord.abilities.map(async (ability) => {
          const abilityNameJP = await getAbilityJPName(ability.ability.url);
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

      // ステータス名の日本語名を取得
      const statsJP = await Promise.all(
        pokemonRecord.stats.map(async (stat) => {
          const statNameJP = await getStatJPName(stat.stat.url);
          return {
            ...stat,
            stat: {
              ...stat.stat,
              name: statNameJP,
            },
          };
        })
      );
      pokemonRecord.stats = statsJP;

      setPokemon(pokemonRecord);
    };

    fetchPokemonData();
  }, [pokemonId]);

  if (!pokemon) {
    return <div>ロード中・・・</div>;
  }

  return (
    <div className="pokemonStatus">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h1>{pokemon.nameJP}</h1>
      <div>タイプ：{pokemon.typesJP.join(" / ")}</div>
      <div className="cardData">
        <p className="Number">番号：{pokemon.id}</p>
        <p className="title">重さ：{pokemon.weight / 10.0}kg</p>
        <p className="title">高さ：{pokemon.height}m</p>
      </div>
      <div style={{ textAlign: "left" }}>
        特性：
        {pokemon.abilities.map((ability) => ability.ability.name).join(" / ")}
      </div>
      <div className="statusTable">
        <div>
          種族値：
          {pokemon.stats.map((stat, index) => (
            <div key={index}>
              <table>
                <tbody>
                  <tr>
                    <th>{stat.stat.name}</th>
                    <td>{stat.base_stat}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
      {pokemonId < 898 && ( // <-- 898はポケモンの図鑑の最大数です。この数字は最新の図鑑に合わせて変更してください。
        <>
          <div className="prevLink">
            <Link to={`/pokemon/${parseInt(pokemonId, 10) - 1}`}>
              前のポケモンへ
            </Link>
          </div>
          <div className="nextLink">
            <Link to={`/pokemon/${parseInt(pokemonId, 10) + 1}`}>
              次のポケモンへ
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonStatus;
