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

pokeApi.getPokemonStat= (pokeStat) => {
    return fetch(pokemon.stats)
    .then((response) => response.json())
    
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

// retornando a requisição API e Aguardando A PROMISSE.
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
    
};

    const urlStats = `https://pokeapi.co/api/v2/pokeathlon-stat?{id or name}/`
    //testando api - buscando api stats
    fetch(urlStats)
    .then((response) => response.json())
    .then((jsonBodyStats) => console.log(jsonBodyStats))
    .catch((error) => console.error(error))

    //Transformar lista de pokemon em lista HTML