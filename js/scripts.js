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
        // loadDetails(pokemon).then(function () {
        //     showModal(pokemon);
        // });
    }

    // This function opens a modal to display the information of the pokemon that is clicked
    function showModal(item) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");
        //let modalContainer = document.querySelector('#modal-container');

        //clear all existing modal content
        //modalContainer.innerHTML = '';
        modalTitle.empty();
        modalBody.empty();

        /*let modal = document.createElement('div');
        modal.classList.add('modal');*/

        // Add the new modal content
        //let closeButtonElement = document.createElement('button');
        //closeButtonElement.classList.add('modal-close');
        //closeButtonElement.innerText= 'Close';
        //closeButtonElement.addEventListener('click', function () {
        //    hideModal();
        //});

        let titleElement = $("<h1>" + item.name + "</h1>");

        let pokemonImage = $("<img class='modal-img' style='width:50%';>");

        let heightElement = $("<p>" + "Height: " + item.height + "</p>");

        let weightElement = $("<p>" + "Weight: " + item.weight + "</p>");

        let typesElement = $("<p>" + "Type(s): " + pokemon.types.map(getAllTypes).join(', ') + "</p>");
        function getAllTypes (item) {
            console.log(item.type.name)
            return [item.type.name]
        };

        //modal.appendChild(closeButtonElement);
        modalTitle.append(titleElement);
        modalBody.append(pokemonImage);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        //modalContainer.appendChild(modal);

        
       /* modalContainer.classList.add('is-visible');

        modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });*/
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
        let button = document.createElement('btn', 'btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        button.innerText = pokemon.name;
        button.classList.add("btn-primary");
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
        getAll, add, addListItem, showDetails, loadList, loadDetails, showModal, hideModal
    };
})();

console.log(pokemonRepository.getAll())

pokemonRepository.loadList().then(function() {
    // now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



