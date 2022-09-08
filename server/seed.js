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
            drop table if exists comments;
            drop table if exists authors;
            drop table if exists venues;

            CREATE TABLE venues (
                venue_id SERIAL PRIMARY KEY,
                venue_name VARCHAR(100),
                type VARCHAR(100),
                details VARCHAR(1000),
                image_url VARCHAR(1000),
                website_url VARCHAR(1000),
                likes INTEGER
            );

            CREATE TABLE authors (
                author_id SERIAL PRIMARY KEY,
                author_name VARCHAR(100)
            );

            CREATE TABLE comments (
                comment_id SERIAL PRIMARY KEY,
                text VARCHAR(500),
                author_id INTEGER REFERENCES authors(author_id),
                venue_id INTEGER REFERENCES venues(venue_id)
            );

            INSERT INTO venues (venue_name, type, details, image_url, website_url, likes) 
                VALUES ('Red Rock Canyon', 'Hiking', 'Red Rock Canyon is a 195-acre (79 ha) national conservation area located just 17 miles (27 km) west of the Las Vegas Strip. The area is located within the Mojave Desert, and is managed by the Bureau of Land Management as part of its National Landscape Conservation System.', 'https://i.ibb.co/dgx8s7W/redrock-Canyon.jpg', 'https://www.redrockcanyonlv.org/', 0),
                ('Bellagio Fountains', 'Attraction', 'The Bellagio Fountains are a set of dancing water fountains located on the Las Vegas Strip in front of the Bellagio hotel and casino.', 'https://i.ibb.co/ykvJqvS/bellagio-Fountains.jpg', 'https://bellagio.mgmresorts.com/en/entertainment/fountains-of-bellagio.html', 0),
                ('The Venetian', 'Hotel', 'The Venetian Resort Hotel Casino is a luxury hotel and casino resort located on the Las Vegas Strip in Paradise, Nevada, United States. The resort is owned and operated by Las Vegas Sands.', 'https://i.ibb.co/qNKqWpQ/venetian.jpg', 'https://www.venetianlasvegas.com/', 0);
            
            INSERT INTO authors (author_name) 
                VALUES ('vegasBaby'),
                ('newYorker4Life'),
                ('Jane Q.'),
                ('T. Donavan');

            INSERT INTO comments (text, author_id, venue_id)
                VALUES ('There are trails for every skillset here!', 1, 1),
                ('I got married with the fountains as a backdrop.', 2, 2),
                ('I love the gondolas!', 3, 3);

                

        `).then(() => {
            console.log(`DB seeded!`);
            res.sendStatus(200)
        }).catch(err => {
            console.log(`DB NOT seeded `, err);
        });
    }
}