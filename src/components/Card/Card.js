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
        <div>タイプ</div>
        {pokemon.typesJP.map((type, index) => {
          return (
            <div key={index}>
              <span className="typeName">{type}</span>
            </div>
          );
        })}
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
          <p className="title">
            アビリティ：{pokemon.abilities[0].ability.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
