require("dotenv").config();

// configure server to use dotenv
const path = require('path');
// require('dotenv').config({path: path.join(__dirname, '../.env')});



const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

//destructure the port from the .env file
const {SERVER_PORT} = process.env;
const {seed} = require('./seed.js');

console.log(SERVER_PORT);


app.use(express.json());


app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, '../index.html'));

});

app.post('/seed', seed);

const {
    // getVenues,
    // getCommentsAndVenues,
    addVenue,
    likeVenue,
    getComments
    
    
} = require('./controller.js');




// app.get('/api/venues', getCommentsAndVenues);
app.get('/api/venues', getComments);
app.post('/api/venues', addVenue);
app.put('/api/venues/:id', likeVenue);
// app.get('/api/venues/comments/:id', getComments);
// app.get('/api/commentsandvenues/', getCommentsAndVenues);


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));