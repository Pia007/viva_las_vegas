require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());


const {seed} = require('./seed.js');


app.use(express.static(path.join(__dirname, '../public/')));


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
    getAdminVenuesSort,
    deleteVenue,
    getAdminFeedback,
    createFeedback,
    updateFeedback,
    deleteFeedback

} = require('./controllers.js/admin.js');

const {
    registerAdmin,
    loginAdmin
} = require('./controllers.js/auth.js');


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


const port = process.env.PORT || 9007;
app.listen(port, () => console.log(`Listening on port ${port}`));