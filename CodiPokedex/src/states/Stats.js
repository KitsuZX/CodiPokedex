var CodiPokedex = CodiPokedex || {};
CodiPokedex.Stats = function(){};

CodiPokedex.Stats = {

	create: function(){
        this.game.stage.backgroundColor = '#528471';

        var button = this.game.add.button(10, 10, 'backButton', back, this, 2, 1, 0);
        button.width = 75;
        button.height = 75;
        
        button.onInputOver.add(overButton, this);
		button.onInputOut.add(outButton, this);

        var text = this.game.add.text(this.game.width / 2, this.game.height / 2, pokemon[pokemonSelected].name, {font:'bold 150px Arial', fill: '#000'});
        text.anchor.setTo(0.5);
	}
}

function back(){
    CodiPokedex.game.state.start('Searcher');
}