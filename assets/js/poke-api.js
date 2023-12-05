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
    const abilities = pokeDetail.abilities.map((ability) => ability.ability.name).join(', ');
    pokemon.abilities = abilities;  //abastecendo os ARRAYS da classe pokemon-model. Através do método MAP
    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.wieght = pokeDetail.weight;

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

// const searchPokemon = event => {
//     event.preventDefault();
//     const { value } = event.target.pokemon;
//     fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
//     .then(data => data.json())
//     .then(response => renderPokemonData(response))
// }

// const renderPokemonData = data => {
//     const sprite = data.sprites.front_default;
//     const { stats } = data;
//     console.log(stats);
// }