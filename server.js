const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

app = express();

dotenv.config({ path: './config.env' });
require('./db/conn');
const Movie = require('./models/MovieSchema');

app.use(express.json());

app.get('/api/getList', (req, res) => {
    Movie.find().then(movies => {
        return res.send(movies);
    }).catch(err => {
        return res.status(404).send(err);
    })
})

app.post('/api/add', (req, res) => {
    const { MovieName, Language, ReleaseDate, Budget, Collection, PosterUrl} = req.body;
    const movie = new Movie({
        MovieName,
        Language,
        ReleaseDate: new Date(ReleaseDate),
        Budget,
        Collection,
        PosterUrl
    });
    movie.save().then((response) => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(422).send(err);
    })
})

app.put('/api/update/:id', (req, res) => {
    const { MovieName, Language, ReleaseDate, Budget, Collection, PosterUrl} = req.body;
    Movie.updateOne({_id: req.params.id}, {
        MovieName,
        Language,
        ReleaseDate: new Date(ReleaseDate),
        Budget,
        Collection,
        PosterUrl
    }, (response) => {
        res.status(200).send(response);
    });
})

app.delete('/api/delete/:id', (req, res) => {
    Movie.deleteOne({_id: req.params.id}).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(404).send(err);
    })
})

app.get('/api/:id', (req, res) => {
    console.log(req.params.id);
    Movie.findOne({_id: req.params.id}).then(movie => {
        return res.send(movie);
    }).catch(err => {
        return res.status(404).send(err);
    })
})


if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'));
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
})