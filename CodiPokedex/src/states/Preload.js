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
		this.load.image('profileBG', 'assets/images/blue rectangle.png')
		this.load.image('progressBar', 'assets/images/progressBar.jpg')

		this.load.image('bugIcon', 'assets/images/Icon/bugIcon.png')
		this.load.image('darkIcon', 'assets/images/Icon/darkIcon.png')
		this.load.image('dragonIcon', 'assets/images/Icon/dragonIcon.png')
		this.load.image('electricIcon', 'assets/images/Icon/electricIcon.png')
		this.load.image('flyingIcon', 'assets/images/Icon/flyingIcon.png')
		this.load.image('fuegoIcon', 'assets/images/Icon/fuegoIcon.png')
		this.load.image('ghostIcon', 'assets/images/Icon/ghostIcon.png')
		this.load.image('grassIcon', 'assets/images/Icon/grassIcon.png')
		this.load.image('groundIcon', 'assets/images/Icon/groundIcon.png')
		this.load.image('fairyIcon', 'assets/images/Icon/hada.png')
		this.load.image('iceIcon', 'assets/images/Icon/iceIcon.png')
		this.load.image('luchaIcon', 'assets/images/Icon/luchaIcon.png')
		this.load.image('normalIcon', 'assets/images/Icon/normalIcon.png')
		this.load.image('posionIcon', 'assets/images/Icon/posionIcon.png')
		this.load.image('psychicIcon', 'assets/images/Icon/psychicIcon.png')
		this.load.image('rockIcon', 'assets/images/Icon/rockIcon.png')
		this.load.image('steelIcon', 'assets/images/Icon/steelIcon.png')
		this.load.image('waterIcon', 'assets/images/Icon/waterIcon.png')

		this.game.load.json('pokemon', 'assets/data/pokemon.json');

		//Load pokemons
		for (let i = 0; i < 721; i++) {
			this.load.image('pokemonImage'+i, 'assets/pokemonImages/' + (i + 1)+ '.png');			
		}

	},

	create: function(){
		this.pokemon = this.game.cache.getJSON('pokemon').pokemon;
		pokemon = this.pokemon;

		this.state.start('Searcher');
	}
}