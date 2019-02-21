var CodiPokedex = CodiPokedex || {};
CodiPokedex.Searcher = function(){};

//Setting game configuration and loading the assets for the loading screen
CodiPokedex.Searcher = {
	preload(){
		this.game.load.json('pokemon', 'assets/data/pokemon.json');
	},

	create(){

		this.game.stage.backgroundColor = '#852';
		var style = { font: "65px Arial", fill: "#ffffff", align: "center" };

		var pokemon = this.game.cache.getJSON('pokemon').pokemon;

		var index = Math.floor((Math.random() * pokemon.length) % pokemon.length);
		var name = pokemon[index].name;

        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, name, style);

		text.anchor.set(0.5);    
	}
}