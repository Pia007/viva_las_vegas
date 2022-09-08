// const { addVenue } = require("../server/controller");

const { default: axios } = require("axios");

const venuesDiv = document.querySelector('#posts');
const shareBtn = document.querySelector('#share-btn');
const addVenueDiv = document.querySelector('#add-venue-holder');
const closeBtn = document.querySelector('#cancel');

const form = document.querySelector('form');

const baseURL = `http://localhost:9007/api/venues`

const venuesCallback = ({ data: venues }) => {
    displayVenues(venues);
    console.log(venues);
};
const errCallback = (err) => console.log(err.response.data);

const getAllVenues = () => axios.get(baseURL).then(venuesCallback);
const createVenue = (body) => axios.post(baseURL, body).then(getAllVenues).catch(errCallback);
const updateLike = (id, likes) => axios.put(`${baseURL}/${id}`, { likes }).then(getAllVenues).catch(errCallback);
const getComments = (id) => axios.get(`${baseURL}/${id}/comments`).then(({ data: comments }) => displayComments(comments, id)).catch(errCallback);




//form handlers
const submitForm = (e) => {
    e.preventDefault();

    let venueType = document.querySelector('#venue-type');
    let venueName = document.querySelector('#venue-name');
    let venueDetails = document.querySelector('#venue-details');
    let venueImage = document.querySelector('#venue-image'); 
    let venueWebsite = document.querySelector('#venue-website'); 

    let newVenueObj = {
        venue_name: venueName.value,
        type: venueType.value,
        details: venueDetails.value,
        image_url: venueImage.value,
        website_url: venueWebsite.value,
        likes: 0
    };

    createVenue(newVenueObj);

    venueType.value = '';
    venueName.value = '';
    venueDetails.value = '';
    venueImage.value = '';
    venueWebsite.value = '';

    addVenueDiv.style.display = 'none';
}


function createVenueCard(venue) {
    const venueCard = document.createElement('div');
    venueCard.classList.add('card');
    venueCard.classList.add('col-xs')
    venueCard.classList.add('col-md-4');
    venueCard.classList.add('col-lg-3');

    venueCard.classList.add('p-2');
    venueCard.classList.add('m-2');

    venueCard.innerHTML = `
        <h4><a href=${venue.website_url} alt=${venue.venue_name}>${venue.venue_name}</a></h4>
        <img class='card-img' alt=${venue.venue_name} src=${venue.image_url} />
        
        <div class='card-body py-2 px-0'>
            <div class='likes-holder'>
                <button onclick="likeVenue(${venue.venue_id})" class="px-1 like-btn"><i class="fa fa-heart" aria-hidden="true"></i> </button>
                <span class='likes-count'>${venue.likes}</span>
            </div>
            <p class='card-text text-left'>${venue.details}</p>
            

        </div>

    `;

    venuesDiv.appendChild(venueCard); 
    
}


function displayVenues(arr) {
    venuesDiv.innerHTML = '';
    arr.forEach(createVenueCard);
};


function likeVenue(e) {
    let id = e;
    id = parseInt(id);
    console.log(id);

    let likeSpan = document.querySelector('span');
    let likes = parseInt(likeSpan.innerText);
    likes += 1;

    updateLike(id, likes);
}
//     
//     let likeBtn = document.querySelector('.like-btn');
//     
//     console.log(likes);
//     likes += 1;
//     likeSpan.innerText = likes;
//     console.log(likes);

//     let likeObj = {
//         id: e,
//         likes: likes
//     }
//     updateLike(e, likes);
// }
    

// show add Venue form
const showAddForm = (elem) => {
    addVenueDiv.style.display = 'block';
}

const closeAddForm = (elem) => {
    addVenueDiv.style.display = 'none';
}

form.addEventListener('submit', submitForm);
shareBtn.addEventListener('click', showAddForm);
closeBtn.addEventListener('click', closeAddForm);




// load venues on page load
getAllVenues();