var CodiPokedex = CodiPokedex || {};
CodiPokedex.Searcher = function () { };

var pokemonSelected = -1;
var windowHeight = window.innerHeight * window.devicePixelRatio;
var windowWidth = window.innerWidth * window.devicePixelRatio;

//Setting game configuration and loading the assets for the loading screen
CodiPokedex.Searcher = {

	create() {
		this.game.stage.backgroundColor = '#fff';

		var background = this.game.add.sprite(0, 0, 'statsBackground');
		background.width = windowWidth;
		background.height = windowHeight;
		background.fixedToCamera = true;


		this.leftSide = this.game.add.sprite(0, 0, 'searcherBG');
		this.leftSide.width = 350;
		this.leftSide.height = windowHeight;
		this.leftSide.fixedToCamera = true;

		var text = this.game.add.text((this.leftSide.x + this.leftSide.width / 2), 100, 'Buscador', {font:'bold 40px Arial', fill: '#fff'});
		text.anchor.setTo(0.5);
		text.fixedToCamera = true;

		//Crea los rectángulos
		this.rectangles = [];

		var initX = 400;
		var initY = 50;
	
		var numPokemons = 32;
		var pokemonsPerRow = 5;

		var buttonWidth = 250;
		var buttonHeight = 400;

		var xOffset = 50;
		var yOffset = 50;

		var X = initX;
		var Y = initY;

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
		}

		//Aumenta los bordes del mundo para que quepan todos los rectángulos
		this.game.world.setBounds(0, 0, initX + (buttonWidth + xOffset) * pokemonsPerRow, initY + (buttonHeight + yOffset) * (Math.ceil(numPokemons / pokemonsPerRow)));
		
		//Parametros del scroll. No tocar.
		this.dragging = false;
		this.autoScroll = false;
		this.timeConstant = 325;		
		this.game.input.onDown.add(this.beginMove, this);
		this.game.input.onUp.add(this.endMove, this);
		this.game.input.addMoveCallback(this.moveCamera, this);
		
		
		//Crear cuadros para insertar texto
		this.texto = this.game.add.text(50, 50, "", {font:'bold 100px Arial', fill: '#fff'});
		this.texto2 = this.game.add.text(200, 200, "", {font:'bold 100px Arial', fill: '#fff'});
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
		var button = this.game.add.button(x, y, 'button', showPokemonStats, this, 2, 1, 0);
		button.index = i;
		button.width = w;
		button.height = h;

		button.onInputOver.add(overButton, this);
		button.onInputOut.add(outButton, this);
		button.onInputUp.add(upButton, this);

		var name = pokemon[i].name;
		var text = this.game.add.text((x + (x + w)) / 2, (y + (y + h)) / 2, name, {font:'bold 40px Arial'});
		text.anchor.set(0.5);
		return button;
	},	
}

//#region [rgba(70, 50, 30, 0.2)] Botones

function overButton(e){
	e.tint = 0xc0c0c0
}

function upButton(e){
	pokemonSelected = e.index;
	console.log(pokemon[pokemonSelected].name + ' clicked');
	CodiPokedex.game.state.start('Stats');
}

function outButton(e){
	e.tint = 0xffffff
}

function showPokemonStats(e){
	e.tint = 0x00000;
}


//#endregion

//#region [rgba(50, 0, 80, 0.2)] Text Input
function render(){
  this.game.debug.spriteBounds(this.textInput);
}

function inputFocus(sprite){
	sprite.canvasInput.focus();
	console.log("estoy focus");
}

function createInput(x, y){
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
window.onclick = function(event) {
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