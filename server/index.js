require("dotenv").config();

// configure server to use dotenv
const path = require('path');

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

const {
    registerAdmin,
    loginAdmin
} = require('./controllers.js/auth.js');

//write a middleware to check if admin is logged in
// const checkAdmin = (req, res, next) => {
    
//     if(req.admin) {
//         next();
//     } else {
//         res.status(401).send('You are not logged in');
//     }
// }

app.get('/api/venues', getVenues);
app.post('/api/venues', addVenue);
app.put('/api/venues/:id', likeVenue);

app.get('/api/venues', getAdminVenues);
app.get('/api/admin/likes', getAdminVenuesLikes);
app.delete('/api/admin/venues/:id', deleteVenue);
app.get('/api/admin/feedbacks', getAdminFeedback);


app.post('/api/feedbacks', createFeedback);
app.put('/api/admin/feedbacks/:id', updateFeedback);

app.post('/api/admin/register', registerAdmin);
app.post('/api/admin/login', loginAdmin);


app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));