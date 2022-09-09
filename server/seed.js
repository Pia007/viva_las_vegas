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
            drop table if exists venues;

            CREATE TABLE venues (
                venue_id SERIAL PRIMARY KEY,
                venue_name VARCHAR(100),
                type VARCHAR(100),
                details VARCHAR,
                image_url VARCHAR(1000),
                website_url VARCHAR(1000),
                likes INTEGER,
                comments VARCHAR
            );


            CREATE TABLE comments (
                comment_id SERIAL PRIMARY KEY,
                author VARCHAR(30),
                text VARCHAR,
                venue_id INTEGER REFERENCES venues(venue_id)
            );

            INSERT INTO venues (venue_name, type, details, image_url, website_url, likes, comments) 
                VALUES ('Red Rock Canyon', 'Hiking', 'Red Rock Canyon is a 195-acre (79 ha) national conservation area located just 17 miles (27 km) west of the Las Vegas Strip. The area is located within the Mojave Desert, and is managed by the Bureau of Land Management as part of its National Landscape Conservation System.', 'https://i.ibb.co/dgx8s7W/redrock-Canyon.jpg', 'https://www.redrockcanyonlv.org/', 0, '{"There are trails for every skillset here!"}'),
                ('Bellagio Fountains', 'Attraction', 'The Bellagio Fountains are a set of dancing water fountains located on the Las Vegas Strip in front of the Bellagio hotel and casino.', 'https://i.ibb.co/ykvJqvS/bellagio-Fountains.jpg', 'https://bellagio.mgmresorts.com/en/entertainment/fountains-of-bellagio.html', 0, '{"I got married with the fountains as a backdrop."}'),
                ('The Venetian', 'Hotel', 'The Venetian Resort Hotel Casino is a luxury hotel and casino resort located on the Las Vegas Strip in Paradise, Nevada, United States. The resort is owned and operated by Las Vegas Sands.', 'https://i.ibb.co/qNKqWpQ/venetian.jpg', 'https://www.venetianlasvegas.com/', 0, '{"I love the gondolas!", "I almost fell out of the gondola. It was great!"}');
            

            INSERT INTO comments (author, text, venue_id)
                VALUES ('vegasBaby', 'There are trails for every skillset here!', 1),
                ('newYorker4Life','I got married with the fountains as a backdrop.', 2),
                ('Jane Q.', 'I love the gondolas!', 3);

                

        `).then(() => {
            console.log(`DB seeded!`);
            res.sendStatus(200)
        }).catch(err => {
            console.log(`DB NOT seeded `, err);
        });
    }
}