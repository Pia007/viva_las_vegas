require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const {SERVER_PORT} = process.env;
const {seed} = require('./seed.js');


app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, '.../index.html'));

});

app.post('/seed', seed);

const {
    getVenues,
    addVenue,
    likeVenue  
} = require('./controllers/general.js');

const {
    getAdminVenues,
    getAdminVenuesLikes,
    getAdminVenuesSort,
    deleteVenue,
    getAdminFeedback,
    createFeedback,
    updateFeedback,
    deleteFeedback

} = require('./controllers/admin.js');

const {
    registerAdmin,
    loginAdmin
} = require('./controllers/auth.js');


app.get('/api/venues', getVenues);
app.post('/api/venues', addVenue);
app.put('/api/venues/:id', likeVenue);


app.get('/api/venues', getAdminVenues);
app.get('/api/venues/:sort', getAdminVenuesSort); 
app.delete('/api/admin/venues/:id', deleteVenue);
app.get('/api/admin/feedbacks', getAdminFeedback);


app.post('/api/feedbacks', createFeedback);
app.put('/api/admin/feedbacks/:id', updateFeedback);
app.delete('/api/admin/feedbacks/:id', deleteFeedback);

app.post('/api/admin/register', registerAdmin);

app.post('/api/admin/login', loginAdmin);



// app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
const port = process.env.PORT || 9007;
app.listen(port, () => console.log(`Listening on port ${port}`));