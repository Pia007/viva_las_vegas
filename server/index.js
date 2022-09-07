// configure server to use dotenv
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
// require("dotenv").config();


const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

//destructure the port from the .env file
const {SERVER_PORT} = process.env;
// const {seed} = require('./seeder.js');

console.log(SERVER_PORT)


app.use(express.json());


app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, '../index.html'));

    rollbar.log("Some one has a Dream");
});


const {
    getLocations,
    addLocation,
    likeLocation
} = require('./controller.js');


// app.post('/seed', seed);

app.get('/api/locations', getLocations);
app.post('/api/locations', addLocation);
app.put('/api/locations/:id', likeLocation);






app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));