//var CodiPokedex = CodiPokedex || {};
//CodiPokedex.game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'game');

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
mongoose.connect('mongodb://localhost/resthub');
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
});

/*States
CodiPokedex.game.state.add('Boot', CodiPokedex.Boot);
CodiPokedex.game.state.add('Preload', CodiPokedex.Preload);
CodiPokedex.game.state.add('Searcher', CodiPokedex.Searcher);
CodiPokedex.game.state.add('Stats', CodiPokedex.Stats);

CodiPokedex.game.state.start('Boot');
*/


