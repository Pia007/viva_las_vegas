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
        drop table if exists authors;
        drop table if exists questions;
        drop table if exists categories;
        drop table if exists users;
        

        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            user_name VARCHAR(50)
        );

        CREATE TABLE categories (
            category_id SERIAL PRIMARY KEY,
            category_name VARCHAR(50),
            user_id INTEGER REFERENCES users(user_id),
        );

        CREATE TABLE questions (
            question_id SERIAL PRIMARY KEY,
            question VARCHAR(255) NOT NULL,
            user_id INTEGER REFERENCES users(user_id),
            category_id INTEGER REFERENCES categories(category_id)
        );

        CREATE TABLE authors (
            author_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id)
        );

        CREATE TABLE responses (
            response_id SERIAL PRIMARY KEY,
            author_id INTEGER REFERENCES authors(author_id),
            date_added DATE NOT NULL,
            response_text VARCHAR(255) NOT NULL,
            likes INTEGER,
            dislikes INTEGER,
            category_id INTEGER REFERENCES categories(category_id),
        );

        

        INSERT INTO users (user_name)
            VALUES ('Error404'),
                ('Tough Mudder'),
                ('IamDiscord');

        
        `).then(() => {
            console.log(`DB seeded!`);
            res.sendStatus(200)
        }).catch(err => {
            console.log(`DB NOT seeded `, err);
        });
    }
}