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
                status VARCHAR
            );

            INSERT INTO venues ( venue_name, type, details, author, image_url, website_url, likes) 
                VALUES ( 'Red Rock Canyon', 'Hiking', 'Wow what a beautiful experience. We took the 13mi scenic drive through the canyon and stopped at different lookout point for photos and I even got my husband hike on a beginner trail.', 'Jane Q', 'https://i.ibb.co/dgx8s7W/redrock-Canyon.jpg', 'https://www.redrockcanyonlv.org/', 0),
                ( 'Bellagio Fountains', 'Attraction', 'I absolutely love the fountains and how they are choreographed to some of my favorite songs. I, Highly recommended it!', 'newYorker4Life', 'https://i.ibb.co/ykvJqvS/bellagio-Fountains.jpg', 'https://bellagio.mgmresorts.com/en/entertainment/fountains-of-bellagio.html', 0),
                ( 'The Venetian', 'Hotel', 'Top notch everything. I love to shop and I enjoyed the gondola with my hubs. Had a blast!', 'missTERY', 'https://i.ibb.co/6g38ZMj/vene.jpg', 'https://www.venetianlasvegas.com/', 0);
            

        `).then(() => {
            console.log(`DB seeded!`);
            res.sendStatus(200)
        }).catch(err => {
            console.log(`DB NOT seeded `, err);
        });
    }
}