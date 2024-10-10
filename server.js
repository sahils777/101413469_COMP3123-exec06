const express = require('express');
const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://labex06:bMCOP7vv1SfsDfw1@cluster0.8rsj8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();

// Use built-in middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

// Update your MongoDB Atlas connection
mongoose.connect(DB_URL)
    .then(() => {
        console.log("Successfully connected to the MongoDB Atlas server.");
    })
    .catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note Taking Application - Week 06 Exercise</h1>");
});

// Add your Note routes
const noteRoutes = require('./routes/NoteRoutes.js');
app.use('/notes', noteRoutes); // Changed from '/api/notes' to '/notes'

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});
