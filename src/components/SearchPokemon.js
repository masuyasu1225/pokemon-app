import React, { useState, useEffect } from "react";

const SearchPokemon = () => {
  const [searchName, setSearchName] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const [searchType, setSearchType] = useState({});
  const types = [
    "ノーマル",
    "ほのお",
    "みず",
    "でんき",
    "くさ",
    "こおり",
    "かくとう",
    "どく",
    "じめん",
    "ひこう",
    "エスパー",
    "むし",
    "いわ",
    "ゴースト",
    "ドラゴン",
  ];

  useEffect(() => {
    // ここでAPIを呼び出したり、検索結果をフィルタリングしたりします
  }, [searchName, searchNumber, searchType]);

  const handleCheckboxChange = (event) => {
    setSearchType({ ...searchType, [event.target.name]: event.target.checked });
  };
  return (
    <div>
      <label>
        ポケモンの名前：
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </label>
      <label>
        番号：
        <input
          type="text"
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
        />
      </label>
      {types.map((type) => (
        <label key={type}>
          <input
            type="checkbox"
            name={type}
            checked={searchType[type] || false}
            onChange={handleCheckboxChange}
          />
          {type}
        </label>
      ))}
      <label>
        特性：
        <input
          type="text"
          value={searchNumber}
          onChange={(e) => setSearchNumber(e.target.value)}
        />
      </label>
      <button>検索</button>
    </div>
  );
};

export default SearchPokemon;
