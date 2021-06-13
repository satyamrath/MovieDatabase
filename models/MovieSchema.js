const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    MovieName: {
        type: String,
        required: true
    },
    Language: {
        type: String,
        required: true
    },
    ReleaseDate: {
        type: Date,
        required: true
    },
    Budget: {
        type: Number,
        required: true
    },
    Collection: {
        type: Number,
        required: true
    },
    PosterUrl: {
        type: String,
        required: true
    }
})

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;