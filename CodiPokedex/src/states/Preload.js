var CodiPokedex = CodiPokedex || {};
CodiPokedex.Preload = function(){};

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
	},

	create: function(){
		this.state.start('Searcher');
	}
}