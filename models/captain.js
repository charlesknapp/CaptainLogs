const mongoose = require('mongoose');

// The pokemon document is shaped from this schema
const pokemonSchema = new mongoose.Schema({
    name:  {
        type: String,
        required: true
    },
    img:  {
        type: String,
        required: true
    }
});

// Essentially creating a pokemon document
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;