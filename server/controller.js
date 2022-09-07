
const locations = require('./db.json');
let locationID = locations.length+1;


module.exports = {
    getLocations: (req, res) => {
        res.status(200).send(locations);
        // console.log(locations);
    },

    addLocation: (req, res) => {
        let {type, name, text, imageURL, secret} = req.body;
        let likes = 0;

        const newLocation = {
            id: locationID++,
            name,
            text,
            imageURL,
            secret,
            likes
        };

        console.log('Location added:', newLocation);
        console.log(locations.length);

        locations.push(newLocation);

        console.log(locations.length);
        
        res.status(200).send(locations);
    },

    //create a function to like a location
    likeLocation: (req, res) => {
        let { id } = req.params;
        id = Number(id);
        console.log(id);
        console.log(typeof id);

        let { likes } = req.body;
        likes = Number( likes);
        console.log(`Add this many `, likes);

        //interate over the locations array
        // find the location with the matching id
        // update the likes property
        // send the updated location back to the front end

        for (let i = 0; i < locations.length; i++) {
            if (locations[i].id === id) {
                console.log(`Current Likes:` , locations[i].likes);
                locations[i].likes++;
                console.log(`Updated Likes: `, locations[i].likes);
                console.log(`${locations[i].name} now has ${locations[i].likes} like/s`);
                console.log(locations[i]);
                return res.status(200).send(locations);
            }
        }
    }
}