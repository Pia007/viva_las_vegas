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

const locations = require('./db.json');
let locationID = locations.length+1;


module.exports = {
    // get all venues and order them by id
    getVenues: (req, res) => {
        sequelize.query(`SELECT * FROM venues
        ORDER BY venue_id ASC;`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
        // console.log(locations);
    },

    addVenue: (req, res) => {
        const {venue_name, type, details, image_url, website_url, likes} = req.body;
        console.log(req.body);

        sequelize.query(` INSERT INTO venues (venue_name, type, details, image_url, website_url, likes)
            VALUES ('${venue_name}', '${type}', '${details}', '${image_url}', '${website_url}', ${likes});`) 
            .then(dbRes => {
                console.log (`${venue_name} added to DB`);
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    },


    //create a function to like a location

    likeVenue: (req, res) => {
        console.log(req.params.id);
        let venueId = Number(req.params.id);
        // venueId = Number(venueId);
        console.log(venueId);
        
        console.log(req.body);
        let addOneLike = req.body.likes;

        
        sequelize.query(`UPDATE venues SET likes = likes + 1 WHERE venue_id = ${venueId};`)
        .then(dbRes => {
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });

    },

    // write a function to get comments for a specific venue 
    getComments: (req, res) => {
        console.log(req.params.id);
        let venueId = Number(req.params.id);
        console.log(venueId);
        sequelize.query(`SELECT * FROM comments WHERE venue_id = ${venueId};`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },


    //write a function to join the comments table with the venues table and return the comments for a specific venue

    // getCommentsAndVenues: (req, res) => {
    //     console.log(req.params.id);
    //     let venueId = Number(req.params.id);
    //     console.log(venueId);
    //     sequelize.query(`SELECT * FROM comments JOIN venues ON comments.venue_id = venues.venue_id`)
    //     .then(dbRes => {
    //         console.log(dbRes[0]);
    //         res.status(200).send(dbRes[0]);
    //     }).catch(err => {
    //         console.log(err);
    //         res.sendStatus(500);
    //     });
    // }

    // getComments: (req, res) => {
    //     console.log(req.params.id);
    //     let venueId = Number(req.params.id);
    //     console.log(venueId);
    //     sequelize.query(`SELECT * FROM comments WHERE venue_id = ${venueId};`)
    //     .then(dbRes => {
    //         res.status(200).send(dbRes[0]);
    //     }).catch(err => {
    //         console.log(err);
    //         res.sendStatus(500);
    //     });
    // }

    // add function to add a comment to a venue

}
