var CodiPokedex = CodiPokedex || {};
CodiPokedex.Searcher = function(){};

//Setting game configuration and loading the assets for the loading screen
CodiPokedex.Searcher = {
	create: function(){
		var style = { font: "65px Arial", fill: "#ffffff", align: "center" };

        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "- phaser -\nwith a sprinkle of\npixi dust", style);

		text.anchor.set(0.5);      
		
		//  And now we'll color in some of the letters
		text.addColor('#ffff00', 16);
		text.addColor('#ffffff', 25);
	
		text.addColor('#ff00ff', 28);
		text.addColor('#ffffff', 32);
	}
}