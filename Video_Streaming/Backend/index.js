    /* eslint-disable no-undef */
    const express = require('express');
    const mongoose = require('mongoose');
    const { Movie, TV } = require("./models/models.js");
    const cors = require('cors');
    const multer = require('multer');
    const path = require('path');
    const dotenv = require("dotenv");
    const databaseConnection = require('./utils/database.js');
    const cookieParser = require('cookie-parser');
    const userRoute = require('./routes/userRoute.js');

    dotenv.config();
    const app = express();

    databaseConnection();

    app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
    app.use(express.json());
    app.use("/videos", express.static('videos'));
    app.use("/images", express.static('images'));
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());
    app.use("/api/v1/user", userRoute);

    app.get("/", (req, res) => {
        res.send("Welcome to my website");
    });

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === 'videoFile' || file.fieldname === 'trailerFile') {
                cb(null, 'videos');
            } else if (file.fieldname === 'imageFile') {
                cb(null, 'images');
            }
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const upload = multer({ storage });

    app.post('/api/movies', upload.fields([{ name: 'videoFile' }, { name: 'trailerFile' }, { name: 'imageFile' }]), async (req, res) => {
        try {
            const { title, description, duration, age, release, genre } = req.body;
            const videoFileName = req.files['videoFile'][0].filename;
            const trailerFileName = req.files['trailerFile'][0].filename;
            const imageFileName = req.files['imageFile'][0].filename;
            const videoUrl = `/videos/${videoFileName}`;
            const trailerUrl = `/videos/${trailerFileName}`;
            const imageUrl = `/images/${imageFileName}`;
            const movie = await Movie.create({ title, description, duration, age, release, genre, videoUrl, trailerUrl, imageUrl });
            res.status(201).json(movie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.get("/", (req, res) => {
        res.send("Welcome to my website");
    });

    app.get('/api/movies', async (req, res) => {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.get('/api/movies/:id', async (req, res) => {
        try {
            const movie = await Movie.findById(req.params.id);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.put('/api/movies/:id', async (req, res) => {
        try {
            const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.delete('/api/movies/:id', async (req, res) => {
        try {
            const movie = await Movie.findByIdAndDelete(req.params.id);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.status(200).json({ message: 'Movie deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.post('/api/tv', upload.fields([{ name: 'videoFile' }, { name: 'trailerFile' }, { name: 'imageFile' }]), async (req, res) => {
        try {
            const { title, description, duration, age, release, genre } = req.body;
            const videoFileName = req.files['videoFile'][0].filename;
            const trailerFileName = req.files['trailerFile'][0].filename;
            const imageFileName = req.files['imageFile'][0].filename;
            const videoUrl = `/videos/${videoFileName}`;
            const trailerUrl = `/videos/${trailerFileName}`;
            const imageUrl = `/images/${imageFileName}`;
            const tv = await TV.create({ title, description, duration, age, release, genre, videoUrl, trailerUrl, imageUrl });
            res.status(201).json(tv);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.get('/api/tv', async (req, res) => {
        try {
            const tvShows = await TV.find();
            res.status(200).json(tvShows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.get('/api/tv/:id', async (req, res) => {
        try {
            const tvShow = await TV.findById(req.params.id);
            if (!tvShow) {
                return res.status(404).json({ message: 'TV show not found' });
            }
            res.status(200).json(tvShow);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.put('/api/tv/:id', async (req, res) => {
        try {
            const tvShow = await TV.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!tvShow) {
                return res.status(404).json({ message: 'TV show not found' });
            }
            res.status(200).json(tvShow);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.delete('/api/tv/:id', async (req, res) => {
        try {
            const tvShow = await TV.findByIdAndDelete(req.params.id);
            if (!tvShow) {
                return res.status(404).json({ message: 'TV show not found' });
            }
            res.status(200).json({ message: 'TV show deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
