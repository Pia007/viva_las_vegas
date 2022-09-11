require("dotenv").config();

const {CONNECTION_STRING} = process.env;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});


module.exports = {
    //write a function that will list our all of the venues based on created date (most recent first) in pst time zome
    getAdminVenues: (req, res) => {
        sequelize.query(`SELECT venue_id, venue_name, likes 
        FROM venues
        ORDER BY created_at DESC;`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },

    // write a function that will list the venues based on most likes
    getAdminVenuesLikes: (req, res) => {
        sequelize.query(`SELECT * FROM venues ORDER BY likes DESC`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },
    deleteVenue: (req, res) => {
        console.log(req.params.id);
        let venueId = Number(req.params.id);
        console.log(venueId);
        sequelize.query(`DELETE FROM venues WHERE venue_id = ${venueId}`)
        .then(dbRes => {
            console.log('Venue deleted : ',dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },
    // write a function that list feed back based on date created
    getAdminFeedback: (req, res) => {
        sequelize.query(`SELECT created_at AT TIME ZONE 'UTC' AT TIME ZONE 'PST', feedback
        FROM feedbacks
        ORDER BY created_at DESC;`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);    
        });
    },
    //write a function that will allow users to send feedback to the admin
    createFeedback: (req, res) => {
        const {feedback, resolved} = req.body;
        console.log(req.body);
        sequelize.query(`INSERT INTO feedbacks (author, text) VALUES ('${feedback}', false);`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },

    // write a function to update the feedback to resolved
    updateFeedback: (req, res) => {
        const {feedback_id} = req.params;
        console.log(req.params);
        sequelize.query(`UPDATE feedbacks SET resolved = true WHERE feedback_id = ${feedback_id};`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },
    

}