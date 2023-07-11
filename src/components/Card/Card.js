import React from "react";
import "./Card.css";

function Card({ pokemon }) {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="cardName">{pokemon.nameJP}</h3>
      <div className="cardTypes">
        <div>タイプ：{pokemon.typesJP && pokemon.typesJP.join(" / ")}</div>
        {/* {pokemon.typesJP &&
          pokemon.typesJP.map((type, index) => {
            return (
              <div key={index}>
                <span className="typeName">{type}</span>
              </div>
            );
          })} */}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="Number">番号：{pokemon.id}</p>
        </div>
        <div className="cardData">
          <p className="title">重さ：{pokemon.weight / 10.0}kg</p>
        </div>
        <div className="cardData">
          <p className="title">高さ：{pokemon.height}m</p>
        </div>
        <div className="cardData">
          <div>
            特性：
            {pokemon.abilities &&
              pokemon.abilities
                .map((abilityObj) => abilityObj.ability.name)
                .join(" / ")}{" "}
          </div>
          {/* {pokemon.abilities &&
            pokemon.abilities.map((ability, index) => {
              return (
                <div key={index}>
                  <span className="ability">{ability.ability.name}</span>
                </div>
              );
            })} */}
        </div>
      </div>
    </div>
  );
}

export default Card;
