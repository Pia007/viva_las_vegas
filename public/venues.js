


const venuesDiv = document.querySelector('#posts');
const commentBox = document.querySelector('#comments');

const shareBtn = document.querySelector('#share-btn');
const addVenueDiv = document.querySelector('#add-venue-holder');
const closeBtn = document.querySelector('#cancel');
// const commentsDiv = document.createElement('#comments');

const form = document.querySelector('form');

// the base url includes the venue endpoint this has to be different for comments
const baseURL = `http://localhost:9007/api`

// create a c
const venuesCallback = ({ data: venues }) => {
    displayVenues(venues);
    console.log(venues);
};

const commentsCallback = ({ data: comments }) => {
    displayComments(comments);
    
};

const errCallback = (err) => console.log(err.response.data);


const getAllVenues = () => axios.get(`${baseURL}/venues`).then(venuesCallback);
const createVenue = (body) => axios.post(`${baseURL}/venues`, body).then(getAllVenues).catch(errCallback);
const updateLike = (id, likes) => axios.put(`${baseURL}/venues/${id}`, { likes }).then(getAllVenues).catch(errCallback);

//get all of the comments then add them to the correct venue
const getComments = () => axios.get(`${baseURL}/comments`).then(commentsCallback);
// get comments based on venue id
const getVenueComments = (id) => axios.get(`${baseURL}/comments/${id}`).then(commentsCallback).catch(errCallback);

const getTheComments =() => {
    
    axios.get(`${baseURL}/comments`).then(res => {
        //get all of the venue ids and display them 
        const venues = res.data;
        console.log(venues);
    
    }).catch(err => console.log(err));

        const myVenues = venues;
        console.log('My venues', myVenues);


        // venues.forEach(venue => {
        for (let i = 0; i < venues.length; i++) {
            let venueId = 3;
            console.log('Venue id ', venueId);
            //get the comments for each venue
            axios.get(`${baseURL}/comments/${venueId}`).then(res => {
                let comments = res.data;
                for (let i = 0; i < comments.length; i++) {
                    let commentArr =[];
                    if(venueId === comments[i].venue_id) {
                        console.log(match);
                    }
                }
                
                for (let i = 0; i < comments.length; i++) {
                    let commentDiv = document.createElement('div');
                    commentDiv.classList.add('comment');
                    commentDiv.innerHTML = `

                        <p>${comments[i].comment}</p>
                        <p>${comments[i].commenter}</p>
                        <p>${comments[i].date}</p>
                    `;
                };
            });
        };
    }     
//         console.log('the data ', res.data);

//         let id = 3;
//         axios.get(`${baseURL}/comments/${3}`).then(res => {
//             console.log('This is the venue id: ' ,id);
//             console.log(res.data);
//         })
//     }).catch(err => console.log(err));
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


function createVenueCard(venue, comment) {
    
    console.log(`Venue ${venue.venue_id}`);
    let id = venue.venue_id;
    // console.log('This is the venue id: ' ,id);

    const venueCard = document.createElement('div');
    // give the venue card the id of the venue id
    
    //  = venue_id;
    // console.log(comment-id);
    
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

            <button onclick="showComments(${venue.venue_id})" class="px-1 see-comment-btn">See Comments</button>
            
            
            
            <div id='comments-${venue.venue_id}' class='comments-holder'>
                ${comment.text}
            </div>
            
        </div>
    `;


    venuesDiv.appendChild(venueCard);
    // venueCard.append(commentCard);
    // return venueCard;
    // venueComment(venue.venue_id);
}



function displayVenues(arr) {
    venuesDiv.innerHTML = '';
    arr.forEach(createVenueCard);
};


// create comments of each venue
function createCommentCard(comment) {

    const commentCard = document.createElement('div');
    commentCard.classList.add('comment');
    commentCard.classList.add('col-xs')
    commentCard.classList.add('col-md-4');
    commentCard.classList.add('col-lg-3');

    commentCard.classList.add('p-2');
    commentCard.classList.add('m-2');

    commentCard.innerHTML = `
        <p>${comment.author}</p>
        <p>${comment.text}</p>
    `;

    commentBox.appendChild(commentCard);

    return commentCard;
    
}

const commentDivs = document.querySelectorAll('.comments-holder');
const commentBtns = document.querySelectorAll('.see-comment-btn');

commentDivs.forEach(commentDiv => {
    commentDiv.id = `comments-${venue.venue_id}`;
    commentDiv.innerHTML = '';
    commentDiv.innerHTML = `
        <p>${comment.text}</p>
        <p>${comment.author}</p>
        
        `;
    commentDiv.style.display = 'none';
});

// display comments of each venue
function displayComments(arr) {
    commentBox.innerHTML = '';
    arr.forEach(createCommentCard);
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


function showComments(e) {
    let id = e;
    id = parseInt(id);
    console.log(id);

    getVenueComments(id);

    let commentDiv = document.querySelector(`#comments-${id}`);
    console.log(commentDiv);
    
    

    commentDiv.style.display = commentDiv.style.display === 'none' ? 'block' : 'none';
    return commentDiv;
}

//add event listeners to each comments button


// show add Venue form
const showAddForm = (elem) => {
    addVenueDiv.style.display = 'block';
}

const closeAddForm = (elem) => {
    addVenueDiv.style.display = 'none';
}

form.addEventListener('submit', submitForm);
shareBtn.addEventListener('click', showAddForm);
closeBtn.addEventListener('click', closeAddForm);commentBtns.forEach(commentBtn => {
    commentBtn.addEventListener('click', showComments);
});




// load venues on page load
getAllVenues();
getComments();
// getVenueComments();
getTheComments();