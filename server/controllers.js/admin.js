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
    getAdminVenues: (req, res) => {
        sequelize.query(`SELECT venue_id, venue_name, author, likes 
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
    getAdminVenuesSort: (req, res) => {
        let {sort} = req.params;
        console.log(sort);

        sequelize.query(`SELECT * FROM venues ORDER BY ${sort} ASC;`)
        .then(dbRes => {
            // console.log(dbRes[0]);
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
    // list feed back based on date created
    getAdminFeedback: (req, res) => {
        sequelize.query(`SELECT created_at AT TIME ZONE 'UTC' AT TIME ZONE 'PST', feedback_id, feedback, resolved
        FROM feedbacks
        ORDER BY feedback_id ASC;`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);    
        });
    },
    // send feedback to the admin
    createFeedback: (req, res) => {
        const {feedback, resolved} = req.body;
        console.log(req.body);
        sequelize.query(`INSERT INTO feedbacks (feedback, resolved ) VALUES ('${feedback}', false);`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },

    // update the feedback to resolved
    updateFeedback: (req, res) => {
        let {feedbackId} = req.params.id;
        feedbackId = Number(req.params.id);
        console.log(feedbackId);
        
        sequelize.query(`UPDATE feedbacks SET resolved = true WHERE feedback_id = ${feedbackId};`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },
    // delete the feedback
    deleteFeedback: (req, res) => {
        let {feedbackId} = req.params.id;
        feedbackId = Number(req.params.id);
        console.log(feedbackId);
        sequelize.query(`DELETE FROM feedbacks WHERE feedback_id = ${feedbackId};`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    }
    
}