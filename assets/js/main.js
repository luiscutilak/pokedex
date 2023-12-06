

const pokemonListHtml = document.getElementsByClassName('pokemons'); //aqui pegamos somente a lista de pokemons da <ol> no HTML
const loadMoreButton = document.getElementById('loadMoreButton'); //aqui carregamos a nova lista cada vez que é clicado no botao load more.
const pokemon = document.getElementsByClassName('pokemon'); //aqui vamos pegar tods os elementos la do html na lista <li> da classe pokemon.

const maxRecords = 151;
const limit = 10;
let offset = 0;

//função que carrega novos atributos ao HTML dinamicamente. Ou seja insere os dados no HTML dinamicamente
function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                 alt="${pokemon.name}">
        </div>
    </li>
`
};

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            const newHtml = pokemons.map(convertPokemonToLi).join('');
            pokemonList.innerHTML += newHtml;
        });
};

loadPokemonItens(offset, limit);


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);

    } else {
        loadPokemonItens(offset, limit);
    };
});

// chamando a escuta do evento de click no HTML, e abrindo um modal com as novas caracteristicas(CARD dos STATS)

pokemonListHtml.addEventListener('click', (event) => {
    const clickedPokemon = event.target.closest('.pokemon');
    
    if (clickedPokemon) {

        const pokemonData = JSON.parse(clickedPokemon.getAttribute('data-pokemon'));  //se o pokemon foi cliclado, entra no if JSON.parse() transforma a string JSON em um objeto para ser manipulado
        const pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1); //atribuindo o retorno do JSON transformado em objto e manipulando  nome, primeira letra(charAt), toUpperCase em letra maiuscula, name.slice(1), retira as duas primeiras chaves do objeto.
        const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
        const modalBody = document.getElementById('pokemonModalBody'); // construindo Modal 

        modalBody = document.getElementById('pokemonModalBody');

        //Transformando para Arquivo Texto, inserindo no HTML, com as especialidades de cada pokemon, dinamicamente.
        modalBody.innerHTML = `
            
            <div class="row-pokemon ${pokemonData.type}">

                <div class="modal-header">
                    <h2 class="modal-title">${pokemonData.name} - #${pokemonData.number}</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close></button>
                </div>
                <br>
                <div class="poke-img-container">
                    <img height="150" src="${pokemonData.photo}" alt="${pokemonData.name}">
                </div>
                <div class="moredetail">
                    <table>
                        <thead>
                            <tr class="poke-about-headline">
                                <th>About</th>
                                <th>Base Stats</th>
                                <th>Evolution</th>
                                <th>Moves</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>Species</td>
                                <td colspan="3"${pokemonData.species}</td>
                            </tr>    
                            <tr>
                            <td>Height</td>
                            <td colspan="3">${pokemonData.height}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td colspan="3">${pokemonData.weight}</td>
                        </tr>
                        <tr>
                            <td>Abilities</td>
                            <td colspan="3">${pokemonData.abilities}</td>
                        </tr>   
                    </tbody>
                </table>                        
            </div>               
        </div>
    `
        modal.show();
    };
});