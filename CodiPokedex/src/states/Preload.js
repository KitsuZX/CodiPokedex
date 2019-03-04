var CodiPokedex = CodiPokedex || {};
CodiPokedex.Preload = function(){};

var pokemon;

CodiPokedex.Preload = {
	//Loading the game assets
	preload: function(){
		//Show logo in loading screen
		this.logo = this.add.sprite(0, 0, 'logo');
		this.logo.width = this.game.width;
		this.logo.height = this.game.height;
		this.preloadBar = this.add.sprite(this.game.world.centerX - 130, this.game.world.height - 50 , 'preloadBar');	
		this.load.setPreloadSprite(this.preloadBar);

		//Load game assets	
		this.load.image('button', 'assets/images/button.png')
		this.load.image('searcherBG', 'assets/images/searcherBG.png')
		this.load.image('backButton', 'assets/images/backButton.png')
		this.load.image('background', 'assets/images/background.png')
		this.load.image('statsBackground', 'assets/images/fondo.png')
		this.load.image('pokeballBase', 'assets/images/pokeball base.png')
		this.load.image('pokeballIcon', 'assets/images/pokeball icon simple white.png')
		this.load.image('samplePokemon', 'assets/pokemonImages/257.png')
		this.load.image('typeIcon', 'assets/images/electric.png')

		this.game.load.json('pokemon', 'assets/data/pokemon.json');

	},

	create: function(){
		this.pokemon = this.game.cache.getJSON('pokemon').pokemon;
		pokemon = this.pokemon;

		this.state.start('Searcher');
	}
}