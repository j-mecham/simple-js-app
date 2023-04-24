let pokemonList = [
    {name: 'Bulbasaur', height: 7, types: ['grass', 'poison']},
    {name: 'Pikachu', height: 4, types: ['field','fairy']},
    {name: 'Luxray', height: 14, types: ['field']},
    {name: 'Ninetales', height: 11, types: ['field']}
];

/*
    This loop iterates over the array 
    and writes to the document the name and 
    height of the pokemon.
    It also checks the height value and sends a message
    if the pokemon is taller than 11
*/
for (let i = 0; i < pokemonList.length; i++) {
    let name = pokemonList[i].name;
    let height = pokemonList[i].height;
    document.write(name + ' (height: ' + height + ')');
    if (height > 11) {
        document.write(' - Wow, that\'s big!')
    }
    document.write('<br><br>');
}