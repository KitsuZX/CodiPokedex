var x = 0;
var y = 0;
var data;
var pokemons;

function preload(){  
    data = loadJSON('assets/data/pokemon.json'); 
}

function setup() {
    pokemons = data.pokemon;

    createCanvas(200, pokemons.length * 15);
    background(255)

    for (var i = 0; i < pokemons.length; i++) {   
        var name = pokemons[i].name;
        console.log(name);   
        text(name, 0, i * 15);
    }
}   


