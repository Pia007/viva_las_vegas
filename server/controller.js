
const locations = require('./db.json');
let locationId = locations.length;


module.exports = {
    getLocations: (req, res) => {
        res.status(200).send(locations);
    },

    addLocation: (req, res) => {
        let {name, text, image, secret} = req.body;

        const newLocation = {
            id: locationId++,
            name,
            text,
            image,
            secret
        };

        console.log('Location added:', newLocation);
        console.log(locations.length);

        locations.push(newLocation);

        console.log(locations.length);
        
        res.statust(200).send(locations);
    },
}