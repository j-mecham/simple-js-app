let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur', 
            height: 7, 
            types: ['grass', 'poison']
        },
        {
            name: 'Pikachu', 
            height: 4, 
            types: ['field','fairy']
        },
        {
            name: 'Luxray', 
            height: 14, 
            types: ['field']
        },
        {
            name: 'Ninetales', 
            height: 11, 
            types: ['field']
        }
    ]

    function getAll () {
        return pokemonList;
    }

    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    // This function logs the pokemon object to the DOM
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    /*This function identifies and fills the HTML ul with 
    li items that are buttons which listen for clicks. 
    When clicked they log that specific pokemon object to the
    DOM. It also makes the button have appropriate inner text and 
    adds a class to each for CSS.*/
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');
        let button = document.createElement('button');
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    }
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    }
})();

console.log(pokemonRepository.getAll())

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});


