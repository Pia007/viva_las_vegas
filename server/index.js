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
    getVenues,
    addVenue,
    likeVenue  
} = require('./controllers.js/general.js');

const {
    getAdminVenues,
    getAdminVenuesLikes,
    deleteVenue,
    getAdminFeedback,
    createFeedback,
    updateFeedback

} = require('./controllers.js/admin.js');


app.get('/api/venues', getVenues);
app.post('/api/venues', addVenue);
app.put('/api/venues/:id', likeVenue);

app.get('/api/venues', getAdminVenues);
app.get('/api/admin/likes', getAdminVenuesLikes);
app.delete('/api/admin/venues/:id', deleteVenue);
app.get('/api/feedbacks', getAdminFeedback);
app.post('/api/feedbacks', createFeedback);
app.put('/api/feedbacks/:id', updateFeedback);

// app.get('/api/comments/:id', getVenueComments);


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));