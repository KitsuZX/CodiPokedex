var CodiPokedex = CodiPokedex || {};
CodiPokedex.Boot = function(){};

//Setting game configuration and loading the assets for the loading screen
CodiPokedex.Boot = {

	preload: function(){
		//Assets we'll use in the loading screen
		this.load.image('loadingScreen1', 'assets/images/loadingScreen_1.jpg');
		this.load.image('loadingScreen2', 'assets/images/loadingScreen_2.jpg');		
		this.load.image('loadingScreen3', 'assets/images/loadingScreen_3.jpg');		
		this.load.image('loadingScreen4', 'assets/images/loadingScreen_4.jpg');		
		this.load.image('loadingScreen5', 'assets/images/loadingScreen_5.jpg');		
		this.load.image('preloadBar', 'assets/images/preloader_bar_ph.png');
	},
	create: function(){
		CodiPokedex.Stats.hideHTML();
		//Loading screen will have a white color
		this.game.stage.backgroundColor = '#000';

		//Scaling options
		this.scale.minWidth = 240;
		this.scale.maxHeight = 170;
		this.scale.maxWidth = 2880;
		this.scale.maxHeight = 1920;

		//Have the game centered horizontally
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignVetically = true;
		this.scale.pageAlignHorizontally = true;    

		//Scaling options
		//*All scaling options here*	
		
		//Physics system for movement
		//this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.state.start('Preload');
	}

	
}