

const locationsDiv = document.querySelector('#posts');

const form = document.querySelector('form');




const baseURL = `http://localhost:9007/api/locations`

const locationsCallback = ({ data: locations }) => {
    displayLocations(locations);
    console.log(locations);
};
const errCallback = (err) => console.log(err.response.data);

const getAllLocations = () => axios.get(baseURL).then(locationsCallback).catch(errCallback);
const createLocation = (body) => axios.post(baseURL, body).then(getAllLocations).catch(errCallback);
//add a like to a location
const updateLike = (id, likes) => axios.put(`${baseURL}/${id}`, { likes }).then(getAllLocations).catch(errCallback);




//form handlers
const submitForm = (e) => {
    e.preventDefault();

    let venueType = document.querySelector('#venue-type');
    let venueName = document.querySelector('#venue-name');
    let venueImage = document.querySelector('#venue-image');  
    let venueDetails = document.querySelector('#venue-details');
    let venueRegrets = document.querySelector('#venue-regrets');

    let newLocationObj = {
        name: venueName.value,
        type: venueType.value,
        imageURL: venueImage.value,
        text: venueDetails.value,
        secret: venueRegrets.value,
        likes: 0
    };

    createLocation(newLocationObj);

    venueType.value = '';
    venueName.value = '';
    venueImage.value = '';
    venueDetails.value = '';
    venueRegrets.value = '';
}




function createLocationCard(location) {
    const locationCard = document.createElement('div');
    locationCard.classList.add('card');
    locationCard.classList.add('col-3');
    locationCard.classList.add('p-3');
    locationCard.classList.add('m-2');

    locationCard.innerHTML = `
        <h4>${location.name}</h4>
        <img class='card-img' alt=${location.name} src=${location.imageURL} />
        
        <div class='card-body py-2 px-0'>
            <p class='card-title'>${location.text}</p>
            <p class='text-left '>What happend in Vegas that you would like to stay in Vegas?</p>
            <p>${location.secret}</p>
            <button onclick="likeLocation(${location.id})" class="btn btn-primary px-1 like-btn"><i class="fa fa-heart" aria-hidden="true"></i> </button>
            <span>${location.likes}</span>
        </div>
    `;

    locationsDiv.appendChild(locationCard);       
}

function displayLocations(arr) {
    locationsDiv.innerHTML = '';
    arr.forEach(createLocationCard);
};

// get the value of the span and add 1 to it
// update the span with the new value
// update the database with the new value

function likeLocation(e) {
    let likeBtn = document.querySelector('.like-btn');
    let likeSpan = document.querySelector('span');
    let likes = parseInt(likeSpan.innerText);
    console.log(likes);
    likes += 1;
    likeSpan.innerText = likes;
    console.log(likes);

    let likeObj = {
        id: e,
        likes: likes
    }
    updateLike(e, likes);
}
    

form.addEventListener('submit', submitForm);



// load locations on page load
getAllLocations();