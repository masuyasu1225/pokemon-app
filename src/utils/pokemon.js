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
        let jaName = data.names.find(
          (name) => name.language.name === "ja"
        ).name;
        resolve(jaName);
      });
  });
};
