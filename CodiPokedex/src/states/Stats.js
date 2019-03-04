var CodiPokedex = CodiPokedex || {};
CodiPokedex.Stats = function(){};

CodiPokedex.Stats = {

	create: function(){

        var background = this.game.add.sprite(0, 0, 'statsBackground');
		background.width = windowWidth;
		background.height = windowHeight;
        background.fixedToCamera = true;

        var pokemonIndex = this.game.add.text(this.game.width / 2, 150, '#' + (pokemonSelected + 1), {font:'bold 200px Arial', fill: '#fff'});
        pokemonIndex.anchor.setTo(0, 0.5);
        pokemonIndex.x = this.game.width / 2 - (pokemonIndex.width / 2) - 175; 
        pokemonIndex.alpha = 0.6;        
        
        var pokeball = this.game.add.sprite(windowWidth / 2, windowHeight / 2 + 75, 'pokeballBase');
        pokeball.anchor.setTo(0.5);
        pokeball.scale.setTo(0.5);

        var pokemonName = this.game.add.text(this.game.width / 2, this.game.height / 2 + 250, pokemon[pokemonSelected].name, {font:'bold 75px Arial', fill: '#fff'});
        pokemonName.anchor.setTo(0, 0.5);
        pokemonName.x = this.game.width / 2 - (pokemonName.width / 2) + 25;
                
        var pokeballIcon = this.game.add.sprite(pokemonName.x - 75, pokemonName.y , 'pokeballIcon');
        pokeballIcon.anchor.setTo(0.5);
        pokeballIcon.scale.setTo(0.4);

        var pokemonImage = this.game.add.sprite(windowWidth / 2, windowHeight / 2 - 175, 'samplePokemon');
        pokemonImage.anchor.setTo(0.5);
        pokemonImage.scale.setTo(1.2);

        var button = this.game.add.button(10, 10, 'backButton', back, this, 2, 1, 0);
        button.width = 75;
        button.height = 75;

        var pokemonType = this.game.add.text(this.game.width / 2, pokemonName.y + 100, 'Tipo: ' + pokemon[pokemonSelected].type1, {font:'bold 40px Arial', fill: '#fff'});
        if(pokemon[pokemonSelected].type2 != ""){
            pokemonType.setText('Tipo: ' + pokemon[pokemonSelected].type1 + "       " + pokemon[pokemonSelected].type2);
        }


        pokemonType.anchor.setTo(0, 0.5);
        pokemonType.x = this.game.width / 2 - (pokemonType.width / 2) - 25;

        var typeIcon1 = this.game.add.sprite(pokemonType.x + pokemonType.width + 50, pokemonType.y, 'typeIcon');
        typeIcon1.anchor.setTo(0.5);
        typeIcon1.scale.setTo(0.35);
        
        if(pokemon[pokemonSelected].type2 != ""){
            var typeIcon2 = this.game.add.sprite(pokemonType.x + pokemonType.width * 0.5 + 40, pokemonType.y, 'typeIcon');
            typeIcon2.anchor.setTo(0.5);
            typeIcon2.scale.setTo(0.35);    
        }
        
      

                
        
        button.onInputOver.add(overButton, this);
		button.onInputOut.add(outButton, this);

        
	}
}

function back(){
    CodiPokedex.game.state.start('Searcher');
}