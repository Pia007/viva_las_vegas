// configure server to use dotenv
require("dotenv").config();


const express = require('express');
const cors = require('cors');

const app = express();

//destructure the port from the .env file
const {SERVER_PORT} = process.env;
// const {seed} = require('./seeder.js');


app.use(cors());

app.use(express.json());


const {
    getLocations 
    // addLocation
} = require('./controller.js');


// app.post('/seed', seed);

app.get('/api/locations', getLocations);
// app.post('/api/locations', addLocation);






app.listen(SERVER_PORT, () => console.log(`Server is up and running on port ${SERVER_PORT}`));