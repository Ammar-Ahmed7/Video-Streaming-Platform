const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    duration: String,
    age : String,
    release : String,
    genre: String,
    videoUrl: String,
    trailerUrl: String,
    imageUrl: String // Add this field
});

const tvSchema = new mongoose.Schema({
    title: String,
    description: String,
    duration: String,
    age : String,
    release : String,
    genre: String,
    videoUrl: String,
    trailerUrl: String,
    imageUrl: String // Add this field
});

const Movie = mongoose.model('Movie', movieSchema);
const TV = mongoose.model('TV', tvSchema);

module.exports = { Movie, TV };
