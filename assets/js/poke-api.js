const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon;
};


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

// retornando a requisição API e Aguardando A PROMISSE. Retorna toda manipulação do Fetch ou seja do consumo da APi
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => renderPokemonData(response))
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats } = data;
    console.log(stats);
}
// function convertPokemonStatsToLi(stat) {
//     return`
//         <li class="pokemon-stat ${stat.name}">
//             <span class="number">#${pokemon.number}</span>
//             <span class="name">${pokemon.name}</span>

//             <div class="pokemons-stats">
                
//                 <ol class="stats">
//                         ${stat.map((stat) => `<li class="stat ${stat}">${stat}</li>`).join('')}
//                 </ol>

//                 <img src="${pokemon.photo}"
//                 alt="${pokemon.name}">
            
//             </div>
//         </li>
//     ` 
// }





// const urlStats = `https://pokeapi.co/api/v2/?characteristic/{id}/`
// const pokemonStat = document.getElementById('characteristicsList');
// // testando api - buscando api stats
//     fetch(urlStats)
//     .then((response) => response.json())
//     .then((jsonBodyStats) => jsonBodyStats.stat)
//     .then((stats) => {

//         for (let i = 0; i < stats.length; i++) {

//             const stat = stats[i];
//             pokemonStat.innerHTML += convertPokemonStatsToLi(stat);
//         }

//     })    
//     .catch((error) => console.error(error))

//Transformar lista de pokemon em lista HTML