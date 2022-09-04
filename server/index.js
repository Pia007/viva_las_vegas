// configure server to use dotenv
require("dotenv").config();

const express = require('express');
const app = express();
const cors = require('cors');

//destructure the port from the .env file
const {SERVER_PORT} = process.env;
const {seed} = require('./seeder.js');

app.use(express.json());
app.use(cors());

// app.post('/seed', seed);






app.listen(SERVER_PORT, () => console.log(`Server is up and running on port ${SERVER_PORT}`));