require("dotenv").config();

const {CONNECTION_STRING} = process.env;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});


module.exports = {

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
}
