import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAbilityJPName,
  getPokemon,
  getPokemonJPName,
} from "../utils/pokemon.js";

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

      setPokemon(pokemonRecord);
    };

    fetchPokemonData();
  }, [pokemonId]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h1>{pokemon.nameJP}</h1>
      <div>タイプ：{pokemon.typesJP.join(" / ")}</div>
      <div className="cardData">
        <p className="Number">番号：{pokemon.id}</p>
      </div>
      <div className="cardData">
        <p className="title">重さ：{pokemon.weight / 10.0}kg</p>
      </div>
      <div className="cardData">
        <p className="title">高さ：{pokemon.height}m</p>
      </div>
      <div>
        特性：
        {pokemon.abilities.map((ability) => ability.ability.name).join(" / ")}
      </div>
    </div>
  );
};

export default PokemonStatus;
