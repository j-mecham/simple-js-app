let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll () {
        return pokemonList;
    }

    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    // This function opens a modal to display the information of the pokemon that is clicked
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            let modalContainer = document.querySelector('#modal-container');

            //clear all existing modal content
            modalContainer.innerHTML = '';

            let modal = document.createElement('div');
            modal.classList.add('modal');

            // Add the new modal content
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText= 'Close';
            closeButtonElement.addEventListener('click', function () {
                hideModal();
            });

            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name;

            let pokemonImage = document.createElement('img');
            pokemonImage.src = pokemon.imageUrl;

            let heightElement = document.createElement('p');
            heightElement.innerText = "Height: " + pokemon.height;

            let weightElement = document.createElement('p');
            weightElement.innerText = "Weight: " + pokemon.weight;

            let typesElement = document.createElement('p');
            function getAllTypes (pokemon) {
                console.log(pokemon.type.name)
                return [pokemon.type.name]
            };
            typesElement.innerText = "Type(s): " + pokemon.types.map(getAllTypes).join(', ');

            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(pokemonImage);
            modal.appendChild(heightElement);
            modal.appendChild(weightElement);
            modal.appendChild(typesElement);
            modalContainer.appendChild(modal);

            
            modalContainer.classList.add('is-visible');

            modalContainer.addEventListener('click', (e) => {
                // Since this is also triggered when clicking INSIDE the modal
                // We only want to close if the user clicks directly on the overlay
                let target = e.target;
                if (target === modalContainer) {
                    hideModal();
                }
            });
        });
    }

    // This function will hide the modal if it is visible
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    // this Listener will hide the modal if a click outside the modal is detected or the escape key is clicked
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
    });

    /*This function identifies and fills the HTML ul with 
    li items that are buttons which listen for clicks. 
    When clicked they log that specific pokemon object to the
    DOM. It also makes the button have appropriate inner text and 
    adds a class to each for CSS.*/
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.list-group');
        let listPokemon = document.createElement('li');
        listPokemon.classList.add('list-group-item')
        let button = document.createElement('button');
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
        button.innerText = pokemon.name;
        button.classList.add("btn-primary");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    }

    //this function loads the list of pokemon using fetch
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    //This function loads the data for a pokemon using the detailsUrl
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return { 
        getAll, add, addListItem, showDetails, loadList, loadDetails, hideModal
    };
})();

console.log(pokemonRepository.getAll())

pokemonRepository.loadList().then(function() {
    // now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



