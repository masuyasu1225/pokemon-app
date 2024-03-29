export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resolve(data);
      });
  });
};

export const getPokemonJPName = (speciesUrl) => {
  return new Promise((resolve, reject) => {
    fetch(speciesUrl)
      .then((res) => res.json())
      .then((data) => {
        // 日本語名を抽出
        console.log(data); // デバッグのための出力
        let jaName = data.names.find(
          (name) => name.language.name === "ja"
        ).name;
        resolve(jaName);
      });
  });
};

export const getAbilityJPName = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let jpName = data.names.find(
          (name) => name.language.name === "ja"
        ).name;
        resolve(jpName);
      });
  });
};

export const getStatJPName = (statUrl) => {
  return new Promise((resolve, reject) => {
    fetch(statUrl)
      .then((res) => res.json())
      .then((data) => {
        let jpName = data.names.find(
          (name) =>
            name.language.name === "ja-Hrkt" || name.language.name === "ja"
        )?.name;
        resolve(jpName);
      });
  });
};
