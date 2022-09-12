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
        // const {user, pwd} = req.body;
        let user = req.body.username;
        let pwd = req.body.password;
        console.log(req.body.username);
        console.log(req.body.password);
        console.log(user);
        console.log(pwd); 

        sequelize.query(`SELECT username, password FROM admin WHERE username = '${user}';`)
        .then(dbRes => {
            console.log(dbRes[0]);
            let resBody = dbRes[0];
            console.log(resBody);
            let pwdHash = resBody[0].password;
            console.log(pwdHash);
            const isMatch = bcrypt.compareSync(pwd, pwdHash);
            if(isMatch) {
                console.log('Passwords match');
                res.status(200).send(dbRes[0]);
            } else {
                console.log('Passwords do not match');
                res.sendStatus(401);
            }
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    }
}

