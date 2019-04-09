/*
// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();
// Import routes
let apiRoutes = require("./api-routes")
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
//mongoose.connect('mongodb://localhost/resthub');
mongoose.connect("mongodb://localhost:27017/pokemonDB");
var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});*/

// Import express
var express = require('express');
// Import Body parser
var bodyParser = require('body-parser');
// Import Mongoose
var MongoClient = require('mongodb');
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db('pokemonDB');
    dbo.collection("pokemonCollection").find({}).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      getPokemons(result);
      db.close();
    });
  });

var pokemons;
function getPokemons(result){
    pokemons = result;
    console.log(pokemons);
}

// Initialize the app
var app = express();

const path = require('path')
//app.get('/', (req, res) => res.send('Welcome To Code Handbook!'))
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
});


/*app.get('/menu', (req, res) => {
    pokemon.find(function(error,documento){
        if(error){console.log(error);}
        console.log(documento);
    })
});*/

app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/src', express.static(__dirname + '/src'));
app.use('/src/states', express.static(__dirname + '/src/states'));
app.use('/assets/images', express.static(__dirname + '/assets/images'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});







