// pokemonModel.js
var mongoose = require('mongoose');
// Setup schema
var pokemonSchema = mongoose.Schema({
    abilities: {
        type: String,
        
    },
    against_bug: {
        type: Number,
        
    },
    against_dark: {
        type: Number,
        
    },
    against_dragon: {
        type: Number,
       
    },
    against_electric: {
        type: Number,
        
    },
    against_fairy: {
        type: Number,
        
    },
    against_fight: {
        type: Number,
        
    },
    against_fire: {
        type: Number,
        
    },
    against_flying: {
        type: Number,
      
    },
    against_ghost: {
        type: Number,
        
    },
    against_grass: {
        type: Number,
        
    },
    against_ground: {
        type: Number,
        
    },
    against_ice: {
        type: Number,
       
    },
    against_normal: {
        type: Number,
        
    },
    against_poison: {
        type: Number,
        
    },
    against_psychic: {
        type: Number,
        
    },
    against_rock: {
        type: Number,
        
    },
    against_steel: {
        type: Number,
        
    },
    against_water: {
        type: Number,
        
    },
    attack: {
        type: Number,
        
    },
    base_egg_steps: {
        type: Number,
        
    },
    base_happiness: {
        type: Number,
      
    },
    base_total: {
        type: Number,
        
    },
    capture_rate: {
        type: Number,
       
    },
    classfication: {
        type: String,
        
    },
    defense: {
        type: Number,
      
    },
    experience_growth: {
        type: Number,
       
    },
    height_m: {
        type: Number,
        
    },
    hp: {
        type: Number,
        
    },
    japanese_name: {
        type: String,
        
    },
    name: {
        type: String,
        required: true
    },
    percentage_male: {
        type: Number,
       
    },
    pokedex_number: {
        type: Number,
        required: true
    },
    sp_attack: {
        type: Number,
        
    },
    sp_defense: {
        type: Number,
       
    },
    speed: {
        type: Number,
       
    },
    type1: {
        type: String,
       
    },
    type2: {
        type: String,
        
    },
    weight_kg: {
        type: Number,
        
    },
    generation: {
        type: Number,
        required: true
    },
    is_legendary: {
        type: Number,
        required: true
    },
    

});
// Export pokemon model
var pokemon = module.exports = mongoose.model('pokemon', pokemonSchema);
module.exports.get = function (callback, limit) {
    pokemon.find(callback).limit(limit);
}