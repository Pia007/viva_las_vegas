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

// const locations = require('../db.json');
// let locationID = locations.length+1;


module.exports = {

    getVenues: (req, res) => {
        // sequelize.query(`SELECT * FROM venues
        sequelize.query(`SELECT * FROM venues
        ORDER BY venue_id ASC;`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },

    addVenue: (req, res) => {
        const { venue_name, type, details, author, image_url, website_url, likes} = req.body;
        console.log(req.body);
        console.log(req.body.author)

        sequelize.query(` INSERT INTO venues (venue_name, type,  details, author, image_url, website_url, likes)
            VALUES ('${venue_name}', '${type}', '${details}', '${author}', '${image_url}', '${website_url}', ${likes});`) 
            .then(dbRes => {
                console.log (`${venue_name} added to DB`);
                res.status(200).send(dbRes[0]);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    },

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
    getComments: (req, res) => {
        sequelize.query(`SELECT * FROM comments;`)
        .then(dbRes => {
            console.log(dbRes[0]);
            res.status(200).send(dbRes[0]);
        }).catch(err => {   
            console.log(err);
            res.sendStatus(500);
        });
    },

    // write a function to add a comment to a specific venue, if the venue has more than one comment, create an array of comments for that venue 
        // and return the array of comments for that venue with the other values
        // THIS WORKS BUT CREATES AN EXTRA CARD FOR VENUE IF THERE IS MORE THAN ONE COMMENT
    // getVenueComments: (req, res) => {
    //     console.log(req.params.id);
    //     let venueId = Number(req.params.id);
    //     console.log(venueId);
    //     sequelize.query(`SELECT author, text FROM comments WHERE venue_id = ${venueId}`)
        
    //     .then(dbRes => {
    //         console.log(dbRes[0]);
    //         res.status(200).send(dbRes[0]);
    //     }).catch(err => {
    //         console.log(err);
    //         res.sendStatus(500);
    //     });
    // }

    // add function to add a comment to a venue

}
