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
        
        
        drop table if exists responses;
        drop table if exists questions;
        drop table if exists categories;
        drop table if exists users;
        

        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            user_name VARCHAR(50)
        );

        CREATE TABLE categories (
            category_id SERIAL PRIMARY KEY,
            category_name VARCHAR(50)
        );

        CREATE TABLE questions (
            question_id SERIAL PRIMARY KEY,
            question VARCHAR(255),
            user_id INTEGER REFERENCES users(user_id),
            category_id INTEGER REFERENCES categories(category_id)
        );

        CREATE TABLE responses (
            response_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            date_added DATE NOT NULL,
            response_text VARCHAR(255) NOT NULL,
            likes INTEGER,
            dislikes INTEGER,
            question_id INTEGER REFERENCES questions(question_id),
            category_id INTEGER REFERENCES categories(category_id)
        );

        

        INSERT INTO users (user_name)
            VALUES ('Error404'),
                ('Tough Mudder'),
                ('IamDiscord');

        INSERT INTO categories (category_name)
            VALUES ('Romance'),
                ('Career'),
                ('Family'),
                ('Finance'),
                ('Education');

        INSERT INTO questions (question, user_id, category_id)
            VALUES ('Will I ever get married?', 1, 1),
                ('Should I quit my job?', 2, 2),
                ('Will my dad ever stop being annoying', 3, 3),
                ('Should I buy a house?', 1, 4),
                ('Should I go to college?', 2, 5);

        INSERT INTO responses (user_id, date_added, response_text, likes, dislikes, question_id, category_id)
            VALUES (1, '2022-09-04', 'Yes, I think you will!', 10, 2, 1, 1),
                (2, '2022-09-04', 'Not unless you a prepared to grind it out for a while!', 5, 8, 2, 2),
                (3, '2022-09-04', 'Uh, quit whining!', 2, 19, 3, 3),
                (1, '2022-09-04', 'You already spend to much money!', 3, 18, 4, 4),
                (2, '2022-09-04', 'Depends on how smart you are!', 15, 2, 5, 5);

        
        `).then(() => {
            console.log(`DB seeded!`);
            res.sendStatus(200)
        }).catch(err => {
            console.log(`DB NOT seeded `, err);
        });
    }
}