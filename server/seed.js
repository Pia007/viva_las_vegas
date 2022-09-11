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
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists feedbacks;
            drop table if exists admin;
            drop table if exists venues;

            CREATE TABLE venues (
                venue_id SERIAL PRIMARY KEY,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                venue_name VARCHAR,
                type VARCHAR,
                details VARCHAR,
                author VARCHAR,
                image_url VARCHAR,
                website_url VARCHAR,
                likes INTEGER
            );


            CREATE TABLE admin (
                admin_id SERIAL PRIMARY KEY,
                username VARCHAR(30),
                password VARCHAR
            );

            CREATE TABLE feedbacks (
                feedback_id SERIAL PRIMARY KEY,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                feedback VARCHAR,
                resolved BOOLEAN
            );

            INSERT INTO venues ( venue_name, type, details, author, image_url, website_url, likes) 
                VALUES ( 'Red Rock Canyon', 'Hiking', 'Red Rock Canyon is a 195-acre (79 ha) national conservation area located just 17 miles (27 km) west of the Las Vegas Strip. The area is located within the Mojave Desert, and is managed by the Bureau of Land Management as part of its National Landscape Conservation System.', 'Jane Q', 'https://i.ibb.co/dgx8s7W/redrock-Canyon.jpg', 'https://www.redrockcanyonlv.org/', 0),
                ( 'Bellagio Fountains', 'Attraction', 'The Bellagio Fountains are a set of dancing water fountains located on the Las Vegas Strip in front of the Bellagio hotel and casino.', 'newYorker4Life', 'https://i.ibb.co/ykvJqvS/bellagio-Fountains.jpg', 'https://bellagio.mgmresorts.com/en/entertainment/fountains-of-bellagio.html', 0),
                ( 'The Venetian', 'Hotel', 'The Venetian Resort Hotel Casino is a luxury hotel and casino resort located on the Las Vegas Strip in Paradise, Nevada, United States. The resort is owned and operated by Las Vegas Sands.', 'missTERY', 'https://i.ibb.co/qNKqWpQ/venetian.jpg', 'https://www.venetianlasvegas.com/', 0);
            

        `).then(() => {
            console.log(`DB seeded!`);
            res.sendStatus(200)
        }).catch(err => {
            console.log(`DB NOT seeded `, err);
        });
    }
}