const venuesDiv = document.querySelector('#posts');
const shareBtn = document.querySelector('#share-btn');
const addVenueDiv = document.querySelector('#add-venue-holder');
const closeBtn = document.querySelector('#cancel');
// const commentsDiv = document.createElement('#comments');

const form = document.querySelector('form');

const baseURL = `http://localhost:9007/api/venues`

const venuesCallback = ({ data: venues }) => {
    displayVenues(venues);
    // console.log(venues);
};

const errCallback = (err) => console.log(err.response.data);


const getAllVenues = () => axios.get(baseURL).then(venuesCallback);
const createVenue = (body) => axios.post(baseURL, body).then(getAllVenues).catch(errCallback);
const updateLike = (id, likes) => axios.put(`${baseURL}/${id}`, { likes }).then(getAllVenues).catch(errCallback);

// comment and id were reversed
const getVenueComments = (id) => axios.get(`${baseURL}/comments/${id}`).then(res => {
    for(let i = 0; i < res.data.length; i++) {
        let comments = res.data;
        
        console.log(res.data[i]);
        let comment = res.data[i];
        console.log(comment.text);
        console.log(comment.author); 
        
    }}).catch(errCallback);




// function createCommentCard(comment) {
//     const commentCard = document.createElement('div');
//     commentCard.classList.add('comment-card');
//     commentCard.innerHTML = `
//         <h4>${comment.author}</h4>
//         <p class='card-text text-left'>${comment.text}</p>
//     `;
//     return commentCard;
// }

// function displayComments(comment, id) {
//     const commentsDiv = document.querySelector(`#comments-${id}`);

//     commentsDiv.innerHTML = ''; 
    
//     commentsDiv.appendChild(createCommentCard(comment));
//     console.log(commentsDiv);
    
// }


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
        
        <div id='id-${venue.venue_id}' class='card-body py-2 px-0'>
            <div class='likes-holder'>
                <button onclick="likeVenue(${venue.venue_id})" class="px-1 like-btn"><i class="fa fa-heart" aria-hidden="true"></i> </button>
                <span class='likes-count'>${venue.likes}</span>
            </div>
            <p class='card-text text-left'>${venue.details}</p>
            <div id='comments-${venue.venue_id}' class='comments-holder'>
                <p>${venue.comments}</p>
            </div>
            
        </div>
    `;
    
    venuesDiv.appendChild(venueCard);
    
    getVenueComments(venue.venue_id);

    
    
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


// <button onclick="showComments(${venue.venue_id})" class="px-1 like-btn">See Comments</button>
            // <div class='comments-holder'>
            //     <p>${comment.text}</p>
            //     <p>${comment.author}</p>
            // </div>

// load venues on page load
getAllVenues();
// getVenueComments();