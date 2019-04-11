var CodiPokedex = CodiPokedex || {};
CodiPokedex.Creator = function () { };


CodiPokedex.Creator = {
    
    preload: function(){

    },

    create: function () {
        this.showHTML();
        this.hideHTML();

        var background = this.game.add.sprite(0, 0, 'statsBackground');
        background.width = windowWidth;
        background.height = windowHeight;
        background.fixedToCamera = true;

        //Back button
        var button = this.game.add.button(10, 10, 'backButton', back, this, 2, 1, 0);
        button.width = 75;
        button.height = 75;

        button.onInputOver.add(overButton, this);
        button.onInputOut.add(outButton, this);

    },

    showHTML: function(){
        
        document.getElementById("PokemonName").style.display = "block";
        document.getElementById("PokemonPokedexNumber").style.display = "block";
        document.getElementById("PokemonType1").style.display = "block";
        document.getElementById("PokemonType2").style.display = "block";
        document.getElementById("PokemonAbilities").style.display = "block";
        document.getElementById("Pokemonis_Legendary").style.display = "block";
        document.getElementById("PokemonCreate").style.display = "block";

    },

    hideHTML() {
        var x = document.getElementById("Busqueda");
        x.style.display = "none";
       
        x = document.getElementById("tipo1");
        x.style.display = "none";

        document.getElementById("ordenAscendente").style.display = "none";
        document.getElementById("ordenDescendente").style.display = "none";
        document.getElementById("generaciones").style.display = "none";
        document.getElementById("is_Legendary").style.display = "none";
        document.getElementById("tipo2").style.display = "none";
        document.getElementById("filter").style.display = "none";
        document.getElementById("crear").style.display = "none";
        document.getElementById("borrar").style.display = "none";
        
        document.getElementById("DeletePokedexNumber").style.display = "none";
		document.getElementById("PokemonDelete").style.display = "none";
    },

    createPokemon: function (){

		var query = {
            name: document.getElementById("PokemonName").value,
            pokedex_number: document.getElementById("PokemonPokedexNumber").value,
			generation: 0,
			orden : 0,
            is_legendary : document.getElementById("Pokemonis_Legendary").value,
            abilities: document.getElementById("PokemonAbilities").value,
			type1: document.getElementById("PokemonType1").value,
			type2: document.getElementById("PokemonType2").value
		}
		query = JSON.stringify(query);

		this.askServer(query);
		
    },
    
    askServer: function(query){
		$.ajax("/addPokemon", 
				{
					method: "POST",
					data: query,
					processData: false,					
					
					headers:{
						"Content-Type": "application/json"
					},

					success: function(data){        
                        console.log(data);
					}
				}
			); 
	}


}

function back() {
    CodiPokedex.game.state.start('Searcher');
}