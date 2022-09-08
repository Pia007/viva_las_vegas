

const venuesDiv = document.querySelector('#posts');

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
        <h4>${venue.venue_name}</h4>
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
    
    
    // const commentsDiv = document.createElement('div');
    // commentsDiv.classList.add('comments-section');

    // venue.comments.forEach(comment => {
    //     const commentDiv = document.createElement('div');
    //     commentDiv.classList.add('comment');
    //     commentDiv.innerHTML = `
    //         <p class='my-2 text-left'>${comment.text}</p>
    //         <p class='my-2 text-right'><em>~${comment.author}<em></span>
    //     `;
    //     commentsDiv.appendChild(commentDiv);

    // });

    // venueCard.appendChild(commentsDiv);
}

//create an array from the class see-comments
// const commentBtns = document.getElementsByClassName('see-comments');




// function to show comments for specific venues comment
// const showComments = (e) => {

//     console.log(commentBtns.length)
//     for ()
// }

function displayVenues(arr) {
    venuesDiv.innerHTML = '';
    arr.forEach(createVenueCard);
};


function likeVenue(e) {
    //get the venue id
    let id = e;
    id = parseInt(id);
    console.log(id);
    //get the venue likes
    let likeSpan = document.querySelector('span');
    let likes = parseInt(likeSpan.innerText);
     likes += 1;
    //update the venue likes
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
    

form.addEventListener('submit', submitForm);




// load venues on page load
getAllVenues();