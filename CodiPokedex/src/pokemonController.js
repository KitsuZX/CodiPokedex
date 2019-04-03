// pokemonController.js
// Import pokemon model
pokemon = require('./pokemonModel');
// Handle index actions
exports.index = function (req, res) {
    pokemon.get(function (err, pokemons) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "pokemons retrieved successfully",
            data: pokemons
        });
    });
};
// Handle create pokemon actions
exports.new = function (req, res) {
    var pokemon = new pokemon();
    pokemon.abilities = req.body.abilities;
    pokemon.against_bug = req.body.against_bug;
    pokemon.against_dark = req.body.against_dark;
    pokemon.against_dragon = req.body.against_dragon;
    pokemon.against_electric = req.body.against_electric;
    pokemon.against_fairy = req.body.against_fairy;
    pokemon.against_fight = req.body.against_fight;
    pokemon.against_fire = req.body.against_fire;
    pokemon.against_flying = req.body.against_flying;
    pokemon.against_ghost = req.body.against_ghost;
    pokemon.against_grass = req.body.against_grass;
    pokemon.against_ground = req.body.against_ground;
    pokemon.against_ice = req.body.against_ice;
    pokemon.against_normal = req.body.against_normal;
    pokemon.against_poison = req.body.against_poison;
    pokemon.against_psychic = req.body.against_psychic;
    pokemon.against_rock = req.body.against_rock;
    pokemon.against_steel = req.body.against_steel;
    pokemon.against_water = req.body.against_water;
    pokemon.attack = req.body.attack;
    pokemon.base_egg_steps = req.body.base_egg_steps;
    pokemon.base_happiness = req.body.base_happiness;
    pokemon.base_total = req.body.base_total;
    pokemon.capture_rate = req.body.capture_rate;
    pokemon.classfication = req.body.classfication;
    pokemon.defense = req.body.defense;
    pokemon.experience_growth = req.body.experience_growth;
    pokemon.height_m = req.body.height_m;
    pokemon.hp = req.body.hp;
    pokemon.japanese_name = req.body.japanese_name;
    pokemon.name = req.body.name;
    pokemon.percentage_male = req.body.percentage_male
    pokemon.pokedex_number = req.body.pokedex_number
    pokemon.sp_attack = req.body.sp_attack
    pokemon.sp_defense = req.body.sp_defense
    pokemon.speed = req.body.speed
    pokemon.type1 = req.body.type1
    pokemon.type2 = req.body.type2
    pokemon.weight_kg = req.body.weight_kg
    pokemon.generation = req.body.generation
    pokemon.is_legendary = req.body.is_legendary

// save the pokemon and check for errors
    pokemon.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New pokemon created!',
            data: pokemon
        });
    });
};
// Handle view pokemon info
exports.view = function (req, res) {
    pokemon.findById(req.params.pokemon_name, function (err, pokemon) {
        if (err)
            res.send(err);
        res.json({
            message: 'pokemon details loading..',
            data: pokemon
        });
    });
};
// Handle update pokemon info
exports.update = function (req, res) {
pokemon.findById(req.params.pokemon_id, function (err, pokemon) {
        if (err)
            res.send(err);
pokemon.name = req.body.name ? req.body.name : pokemon.name;
        pokemon.gender = req.body.gender;
        pokemon.email = req.body.email;
        pokemon.phone = req.body.phone;
// save the pokemon and check for errors
        pokemon.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'pokemon Info updated',
                data: pokemon
            });
        });
    });
};
// Handle delete pokemon
exports.delete = function (req, res) {
    pokemon.remove({
        name: req.params.name
    }, function (err, pokemon) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'pokemon deleted'
        });
    });
};