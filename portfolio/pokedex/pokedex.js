"use strict";

// Define a class responsible for fetching Pokémon data
class PokemonService {

    constructor() {
        this.pokedex = new Pokedex.Pokedex();
    }

    async getPokemonsList(offset = 0, limit = 20) {
        try {
            var promises = []
            const responseList = await this.pokedex.getPokemonsList({ offset, limit });
            responseList.results.forEach(element => {
                var promise = this.pokedex.getPokemonByName(element.name)    
                promises.push(promise)
            });
            const responseDetails = await Promise.all(promises);
            return responseDetails
            
        } catch (error) {
            console.error(error.message);
        }
    }
}

// Define a class responsible for displaying Pokémon cards
class HtmlBuilder {

    constructor(container) {
        this.container = container;
    }
  
    generateBgColorByTypes(types) {
         
    }

    createCard(pokemon) {
        let div = document.createElement("div");
        div.innerHTML = pokemon.name;
        console.log(pokemon)
        this.container.append(div); 
    }
  
    displayPokemonCards(pokemons) {
        pokemons.forEach(pokemon => this.createCard(pokemon))
    }
}
  
  // Function to initiate the app and fetch/display Pokémon cards
async function startApp() {
    const pokemonService = new PokemonService();
    const htmlBuilder = new HtmlBuilder(document.getElementById('content'));

    try {
        // Fetch the list of Pokémon from the PokeAPI
        const pokemons = await pokemonService.getPokemonsList();

        // Display the Pokémon cards
        htmlBuilder.displayPokemonCards(pokemons);
    } catch (error) {
        console.error(error.message);
    }
}
  
// Start the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", startApp);
  