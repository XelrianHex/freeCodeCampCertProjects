// Grab the API containing all data
const fetchData = async () => {
    try {
      const response = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"); // keys: count, results
      if (!response.ok) {
        throw new Error(`fetchData response not ok: ${response.status}`);
      }
      const data = await response.json();
      const {results} = data;
      return results; // keys: id, name, url
    } catch (error) {
      console.log(`fetchData failure: ${error}`);
    }
  }
  
  // Using ID or name from results object, find a pokemon.
  const pokeSearch = async () => {
    const search = document.getElementById("search-input").value
    if (!search) {
      alert("Please type a pokemons name or id to search for")
    }
    const results = await fetchData();
    const pokemon = results.find(entry => entry.id === +search || entry.name.toLowerCase() === search.toLowerCase());
    try{
      const pokeResponse = await fetch(pokemon.url);
      if (!pokeResponse.ok) {
        throw new Error(`pokeResponse response not ok: ${pokeResponse.status}`);
      }
      const pokeInfo = await pokeResponse.json();
      return pokeInfo;
      /* 
      keys:
      base expierence
      height 
      id
      name
      order
      sprites (object)
      stats (array of objects)
      types (array of objects)
      weigth
      */
      } catch (error) {
        alert("Pokémon not found");
      }
  }
  
  // Grab pokemon type name from the types object.
  const pokeTypes = async () => {
    const pokeInfo = await pokeSearch();
    const typesObj = pokeInfo.types;
    const typeName = [];
    typesObj.forEach((item) => {
      if (item.type.name) {
        typeName.push(item.type.name);
      }
    });
    return typeName;
  }
  
  // Grab the pokemon sprite object.
  const pokeImg = async () => {
    const pokeInfo = await pokeSearch();
    const sprites = pokeInfo.sprites;
    return sprites; 
  }
  
  // Grabbing only the data needed for the instructions.
  const statsBlock = async () => {
    const pokeInfo = await pokeSearch();
    const pokeStats = pokeInfo.stats;
    // keys: base_stat, effort, stat (object)
    const hp = pokeStats.find(item => item.stat.name.toLowerCase() === "hp")
    const attack = pokeStats.find(item => item.stat.name.toLowerCase() === "attack")
    const defense = pokeStats.find(item => item.stat.name.toLowerCase() === "defense")
    const specialAttack = pokeStats.find(item => item.stat.name.toLowerCase() === "special-attack")
    const specialDefense = pokeStats.find(item => item.stat.name.toLowerCase() === "special-defense")
    const speed = pokeStats.find(item => item.stat.name.toLowerCase() === "speed")
    // stat keys: name, url
    return {hp, attack, defense, specialAttack, specialDefense, speed}
  }
  
  // Update HTML
  const pokedex = async () => {
    document.getElementById("types").innerHTML = "";
    document.getElementById("image").innerHTML = "";
    document.getElementById("stats-box").style.display = "block";
    document.getElementById("base-text").style.display = "none";
    const pokeInfo = await pokeSearch();
    const {name, id, weight, height} = pokeInfo
    document.getElementById("pokemon-name").textContent = name.toUpperCase();
    document.getElementById("pokemon-id").textContent = `#${id}`;
    document.getElementById("weight").textContent = weight;
    document.getElementById("height").textContent = height;
    const {hp, attack, defense, specialAttack, specialDefense, speed} = await statsBlock();
    document.getElementById("hp").textContent = hp.base_stat;
    document.getElementById("attack").textContent = attack.base_stat;
    document.getElementById("defense").textContent = defense.base_stat;
    document.getElementById("special-attack").textContent = specialAttack.base_stat;
    document.getElementById("special-defense").textContent = specialDefense.base_stat;
    document.getElementById("speed").textContent = speed.base_stat;
    const image = await pokeImg();
    document.getElementById("image").innerHTML += `<img id="sprite" src="${image.front_default}" alt="${name}">`
    const types = await pokeTypes();
    types.forEach((type) => document.getElementById("types").innerHTML += `<span>${type}</span>`)
  }
  
  document.getElementById("search-button").addEventListener("click", pokedex);
  document.getElementById("search-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      pokedex();
    }
  })