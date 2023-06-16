let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll () {
        return pokemonList;
    }

    function add (pokemon) {
        pokemonList.push(pokemon);
    }

    
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    // This function opens a modal to display the information of the pokemon that is clicked
    function showModal(item) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");

        //clear all existing modal content
        modalTitle.empty();
        modalBody.empty();

        // Set the new modal content
        let titleElement = $("<h1>" + item.name.charAt(0).toUpperCase() + item.name.slice(1) + "</h1>");

        let pokemonImage = $("<img class='modal-img' style='width:50%';>");
        pokemonImage.attr("src", item.imageUrl);

        let heightElement = $("<p>" + "Height: " + item.height + "</p>");

        let weightElement = $("<p>" + "Weight: " + item.weight + "</p>");

        let typesElement = $("<p>" + "Type(s): " + item.types.map(getAllTypes).join(', ') + "</p>");
        function getAllTypes (item) {
            console.log(item.type.name)
            return [item.type.name]
        };

        //Add modal Content to the modal
        modalTitle.append(titleElement);
        modalBody.append(pokemonImage);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
    }

    /*This function identifies and fills the HTML ul with 
    li items that are buttons which listen for clicks. 
    When clicked they log that specific pokemon object to the
    DOM. It also makes the button have appropriate inner text and 
    adds a class to each for CSS.*/
    function addListItem(pokemon){
        let pokemonList = document.querySelector('.list-group');
        let listPokemon = document.createElement('li');
        listPokemon.classList.add('list-group-item')
        let button = document.createElement('btn');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.classList.add("btn", "btn-block");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
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
        getAll, add, addListItem, showDetails, loadList, loadDetails, showModal
    };
})();

console.log(pokemonRepository.getAll())

pokemonRepository.loadList().then(function() {
    // now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



