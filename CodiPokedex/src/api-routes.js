// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import pokemon controller
var pokemonController = require('./pokemonController');
// pokemon routes
router.route('/pokemons')
    .get(pokemonController.index)
    .post(pokemonController.new);
router.route('/pokemons/:pokemon_id')
    .get(pokemonController.view)
    .patch(pokemonController.update)
    .put(pokemonController.update)
    .delete(pokemonController.delete);
// Export API routes
module.exports = router;