var CodiPokedex = CodiPokedex || {};
CodiPokedex.Deleter = function () { };

CodiPokedex.Deleter = {

	preload: function () {

	},

	create: function () {
		this.showHTML();

		var background = this.game.add.sprite(0, 0, 'deletePokemonBackground');
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

	showHTML() {
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
		document.getElementById("PokemonName").style.display = "none";
		document.getElementById("PokemonPokedexNumber").style.display = "none";
		document.getElementById("PokemonType1").style.display = "none";
		document.getElementById("PokemonType2").style.display = "none";
		document.getElementById("PokemonAbilities").style.display = "none";
		document.getElementById("Pokemonis_Legendary").style.display = "none";
		document.getElementById("PokemonCreate").style.display = "none";

		document.getElementById("DeletePokedexNumber").style.display = "block";
		document.getElementById("PokemonDelete").style.display = "block";


	},

	deletePokemon: function () {

		var query = {
			pokedex_number: document.getElementById("DeletePokedexNumber").value,
		}
		query = JSON.stringify(query);

		this.askServer(query);

	},

	askServer: function (query) {
		$.ajax("/deletePokemon",
			{
				method: "POST",
				data: query,
				processData: false,

				headers: {
					"Content-Type": "application/json"
				},

				success: function (data) {
					console.log(data);
				}
			}
		);
	}


}

function back() {
	CodiPokedex.game.state.start('Searcher');
}