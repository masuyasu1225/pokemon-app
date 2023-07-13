import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonStatus = () => {
  const { pokemonId } = useParams(); // URLからポケモンのIDを取得
  console.log("Status");
  return (
    <div>
      <h1>{pokemonId}</h1>
    </div>
  );
};

export default PokemonStatus;
