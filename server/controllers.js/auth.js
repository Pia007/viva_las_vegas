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

const bcrypt = require('bcryptjs');

module.exports = {
    // register the admin
    registerAdmin: (req, res) => {
        console.log('Registering Admin');
        const {username, password} = req.body;
        console.log(req.body);
        const salt = bcrypt.genSaltSync(10);
        const pwdHash = bcrypt.hashSync(password, salt);
        console.log(pwdHash);

        sequelize.query(`INSERT INTO admin (username, password) VALUES ('${username}', '${pwdHash}');`)
        .then(dbRes => {
            console.log(dbRes[0]);
            let returnedRes = { ...dbRes[0] };
            delete returnedRes.pwdHash;
            console.log(returnedRes);
            res.status(200).send(returnedRes);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },

    //  admin
    loginAdmin: (req, res) => {
        console.log('Logging in Admin');
        const {username, password} = req.body;
        console.log(req.body);

        sequelize.query(`SELECT * FROM admin WHERE username = '${username}';`)
        .then(dbRes => {
            console.log(dbRes[0]);
            if (dbRes[0].length === 0) {
                res.status(401).send('Username not found');
            } else {
                let returnedRes = { ...dbRes[0][0] };
                delete returnedRes.password;
                console.log(returnedRes);
                if (bcrypt.compareSync(password, dbRes[0][0].password)) {
                    res.status(200).send(returnedRes);
                } else {
                    res.status(401).send('Incorrect password');
                }
            }
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    }
};