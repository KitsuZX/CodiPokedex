var CodiPokedex = CodiPokedex || {};
CodiPokedex.Searcher = function () { };

var pokemonSelected = -1;
var windowHeight = window.innerHeight * window.devicePixelRatio;
var windowWidth = window.innerWidth * window.devicePixelRatio;
var cameraPosition = 0;

//Setting game configuration and loading the assets for the loading screen
CodiPokedex.Searcher = {
	preload(){

	},
	
	create() {
		this.game.stage.backgroundColor = '#fff';	

		var background = this.game.add.sprite(0, 0, 'statsBackground');
		background.width = windowWidth;
		background.height = windowHeight;
		background.fixedToCamera = true;

		this.showHTML();


		this.leftSide = this.game.add.sprite(0, 0, 'searcherBG');
		this.leftSide.width = 350;
		this.leftSide.height = windowHeight;
		this.leftSide.fixedToCamera = true;

		var text = this.game.add.text((this.leftSide.x + this.leftSide.width / 2), 100, 'Buscador', { font: 'bold 40px Arial', fill: '#fff' });
		text.anchor.setTo(0.5);
		text.fixedToCamera = true;

		this.game.camera.y = cameraPosition;

		this.rectangles = [];
		this.indexes = [];
		this.names = [];
		/*Crea los rectángulos
		this.rectangles = [];

		var initX = 400;
		var initY = 50;	

		var pokemonsPerRow = 5;

		var buttonWidth = 225;
		var buttonHeight = 225;

		var xOffset = 75;
		var yOffset = 75;

		

		for (var i = 0; i < numPokemons; i++) {
			var x = X;
			var y = Y;
			this.rectangles.push(this.createPokemonButton(x, y, buttonWidth, buttonHeight, i));
			if ((i + 1) % pokemonsPerRow == 0) {
				Y += buttonHeight + yOffset;
				X = initX;
			} else {
				X += buttonWidth + xOffset;
			}
		}*/

		//Aumenta los bordes del mundo para que quepan todos los rectángulos
		//this.game.world.setBounds(0, 0, initX + (buttonWidth + xOffset) * pokemonsPerRow, initY + (buttonHeight + yOffset) * (Math.ceil(numPokemons / pokemonsPerRow)));

		//Parametros del scroll. No tocar.
		this.dragging = false;
		this.autoScroll = false;
		this.timeConstant = 325;
		this.game.input.onDown.add(this.beginMove, this);
		this.game.input.onUp.add(this.endMove, this);
		this.game.input.addMoveCallback(this.moveCamera, this);


		//Crear cuadros para insertar texto
		this.texto = this.game.add.text(50, 50, "", { font: 'bold 100px Arial', fill: '#fff' });
		this.texto2 = this.game.add.text(200, 200, "", { font: 'bold 100px Arial', fill: '#fff' }); 

		this.getPokemon();
		
	},

	update: function () {
		//Scroll 
		if (this.autoScroll && this.amplitude != 0) {
			this.elapsed = Date.now() - this.timestamp;
			var delta = -this.amplitude * Math.exp(-this.elapsed / this.timeConstant);
			if ((delta > 0.5 || delta < -0.5)) {
				this.game.camera.y = this.target - delta;
				this.autoScroll = true;
			}
			else {
				this.autoScroll = false;
				this.game.camera.y = this.target;
			}
		}

		this.textoBusqueda = document.getElementById("Busqueda").value;
		this.textoTipo = document.getElementById("tipo1").value;
		this.texto.setText(this.textoBusqueda);
		this.texto2.setText(this.textoTipo);
	},

	//#region [rgba(0, 50, 30, 0.2)] Movimiento scroll
	beginMove: function () {
		this.startY = this.game.input.y;
		this.dragging = true;
		this.timestamp = Date.now();
		this.velocity = this.amplitude = 0;
	},

	endMove: function () {
		this.dragging = false;
		this.autoScroll = false;
		if (this.game.input.activePointer.withinGame && (this.velocity > 10 || this.velocity < -10)) {
			this.amplitude = 0.8 * this.velocity;
			this.now = Date.now();
			this.target = Math.round(this.game.camera.y - this.amplitude);
			this.autoScroll = true;
		}
		if (!this.game.input.activePointer.withinGame) {
			this.autoScroll = true;
		}
	},

	moveCamera: function (pointer, x, y) {
		if (this.dragging) {
			var delta = y - this.startY;
			this.startY = y;
			this.now = Date.now();
			var elapsed = this.now - this.timestamp;
			this.timestamp = this.now;

			var v = 1000 * delta / (1 + elapsed);
			this.velocity = 0.8 * v + 0.2 * this.velocity;

			this.game.camera.y -= delta;
		}
	},
	//#endregion

	createPokemonButton: function (x, y, w, h, i) {

		this.indexes[i] = this.game.add.text((x + (x + w)) * 0.5 - 75, (y + (y + h)) * 0.5 - 100,'#'+(pokemon[i].pokedex_number+1), { font: 'bold 75px Arial', fill: '#fff' });
		this.indexes[i].anchor.set(0.5);
		this.indexes[i].alpha = 0.6;

		var button = this.game.add.button(x, y, 'button',/*'pokemonImage'+i,*/ showPokemonStats, this, 2, 1, 0);
		button.index = pokemon[i].pokedex_number;
		button.width = w;
		button.height = h;

		button.onInputOver.add(overButton, this);
		button.onInputOut.add(outButton, this);
		button.onInputUp.add(upButton, this);

		//var name = pokemon[i].name;		
		this.names[i] = this.game.add.text((x + (x + w)) * 0.5, y + h + 25,pokemon[i].name, { font: 'bold 40px Arial', fill: '#fff' });
		this.names[i].anchor.set(0.5);
		
		return button;
	},

	showHTML() {
		var x = document.getElementById("Busqueda");
		x.style.display = "block";

		x = document.getElementById("tipo1");
		x.style.display = "block";

		document.getElementById("ordenAscendente").style.display = "block";
        document.getElementById("ordenDescendente").style.display = "block";
        document.getElementById("generaciones").style.display = "block";
        document.getElementById("is_Legendary").style.display = "block";
        document.getElementById("tipo2").style.display = "block";
        document.getElementById("filter").style.display = "block";
	},

	//#region [rgba(252, 522, 122, 0.1)] Server conexions/filters
	getPokemon: function (){

		var ordenP= 0;
		if(document.getElementById("ordenAscendente").checked){
			ordenP = document.getElementById("ordenAscendente").value;
		}else{
			ordenP = document.getElementById("ordenDescendente").value;
		}

		var query = {
			//name: document.getElementById("Busqueda").value,
			generation: document.getElementById("generaciones").value,
			orden : ordenP,
			is_legendary : document.getElementById("is_Legendary").value,
			type1: document.getElementById("tipo1").value,
			type2: document.getElementById("tipo2").value
		}
		query = JSON.stringify(query);

		this.askServer(query);
		
	},

	askServer: function(query){
		$.ajax("/getPokemon", 
				{
					method: "POST",
					data: query,
					processData: false,					
					
					headers:{
						"Content-Type": "application/json"
					},

					success: function(data){        
						
						/*for(i = 0; i < data.length;i++){
							console.log(data[i].name);
						}*/

						for(i = 0; i < CodiPokedex.Searcher.rectangles.length;i++){
							CodiPokedex.Searcher.rectangles[i].destroy();
							CodiPokedex.Searcher.names[i].destroy();
							CodiPokedex.Searcher.indexes[i].destroy();
						}

						pokemon = data;
						numPokemons = data.length;

						//Crea los rectángulos
						CodiPokedex.Searcher.rectangles = [];

						var initX = 400;
						var initY = 50;	

						var pokemonsPerRow = 5;

						var buttonWidth = 225;
						var buttonHeight = 225;

						var xOffset = 75;
						var yOffset = 75;

						var X = initX;
						var Y = initY;

						for (var i = 0; i < numPokemons; i++) {
							var x = X;
							var y = Y;
							CodiPokedex.Searcher.rectangles.push(CodiPokedex.Searcher.createPokemonButton(x, y, buttonWidth, buttonHeight, i));
							if ((i + 1) % pokemonsPerRow == 0) {
								Y += buttonHeight + yOffset;
								X = initX;
							} else {
								X += buttonWidth + xOffset;
							}
						}

						CodiPokedex.Searcher.game.world.setBounds(0, 0, initX + (buttonWidth + xOffset) * pokemonsPerRow, initY + (buttonHeight + yOffset) * (Math.ceil(numPokemons / pokemonsPerRow)));

					}
				}
			); 
	}

}

//#region [rgba(70, 50, 30, 0.2)] Botones

function overButton(e) {
	e.tint = 0xc0c0c0
}

function upButton(e) {
	pokemonSelected = getPokemonSelected(e);
	console.log(pokemonSelected.name + ' clicked');
	CodiPokedex.game.state.start('Stats');
	cameraPosition = CodiPokedex.Searcher.game.camera.y;
}

function getPokemonSelected(e){
	for(i = 0;i < pokemon.length;i++){
		if(pokemon[i].pokedex_number == e.index){
			return pokemon[i];
		}
	}
}

function outButton(e) {
	e.tint = 0xffffff
}

function showPokemonStats(e) {
	e.tint = 0x00000;
}


//#endregion

//#region [rgba(50, 0, 80, 0.2)] Text Input
function render() {
	this.game.debug.spriteBounds(this.textInput);
}

function inputFocus(sprite) {
	sprite.canvasInput.focus();
	console.log("estoy focus");
}

function createInput(x, y) {
	var bmd = CodiPokedex.game.add.bitmapData(400, 50);
	var textInput = CodiPokedex.game.add.sprite(x, y, bmd);

	textInput.canvasInput = new CanvasInput({
		canvas: bmd.canvas,
		fontSize: 30,
		fontFamily: 'Arial',
		fontColor: '#212121',
		fontWeight: 'bold',
		width: 400,
		padding: 8,
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 3,
		boxShadow: '1px 1px 0px #fff',
		innerShadow: '0spx 0px 5px rgba(0, 0, 0, 0.5)',
		placeHolder: 'Enter message here...'
	});
	textInput.inputEnabled = true;
	textInput.input.useHandCursor = true;
	textInput.events.onInputUp.add(inputFocus, this);

	return textInput;
}

function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}
//#endregion



