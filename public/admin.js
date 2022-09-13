const dashboard = document.querySelector('#admin-dash');
const feedDash = document.getElementById('feedback-dash');
const idBtn = document.querySelector('.admin-id-btn');
const venueBtn = document.querySelector('.admin-venue-btn');
const authorBtn = document.querySelector('.admin-author-btn');
const likesBtn = document.querySelector('.admin-like-btn');

const baseURL = `http://localhost:9007/api`;

const adminVenuesCallback = ({ data: venues }) => {
    displayAdminVenues(venues);
};

const feedbackCallback = ({ data: feedbacks }) => {
    displayFeedbacks(feedbacks);
};


const errCallBack = (err) => console.log(err.response.data)

const getFeedbacks = () => axios.get(`/api/admin/feedbacks`).then(feedbackCallback);

const getAdminVenues = () => axios.get(`/api/venues`).then(adminVenuesCallback);
const getSortedVenues = (sort) => axios.get(`/api/venues/${sort}`).then(adminVenuesCallback);
const deleteVenue = (id) => axios.delete(`/api/admin/venues/${id}`).then(getAdminVenues).catch(errCallback);
const updateFeedback = (id) => axios.put(`/api/admin/feedbacks/${id}`).then(getFeedbacks);
const deleteFeedback = (id) => axios.delete(`/api/admin/feedbacks/${id}`).then(getFeedbacks)


function createAdminView(venue) {
    
    let id = venue.venue_id;

    const venuesList = document.createElement('div');

    venuesList.classList.add('col');
    venuesList.classList.add('p-1');
    venuesList.classList.add('list');

    const venueItem = document.createElement('div');
    
    venueItem.classList.add('venue-item');
    venueItem.classList.add('col');
    venueItem.classList.add('col-lg-10');
    venueItem.classList.add('p-1');
    venueItem.classList.add('m-auto');
    venueItem.classList.add('bg-none');

    venueItem.innerHTML = `
        
        <div id='id-${venue.venue_id} class='p-3 d-flex flex-direction-row justify-content-evenly'>
            <div class='d-flex flex-direction-row justify-content-between'>
                <span class='px-1 v-text'>ID: ${venue.venue_id}</span>
                <span class='mx-2 v-text'>${venue.venue_name}</span>
                <span class='px-0 v-text'>${venue.author} </span>
                <span class='px-0 v-text'>Likes: ${venue.likes} </span>
                
                <button id='venues-${venue.venue_id}' onclick='adminDeleteVenue(${venue.venue_id})' type="button" class="px-2 m-0 delete-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
        </div>
        
        
        
    `;

    venuesList.appendChild(venueItem);
    dashboard.appendChild(venuesList);
}


function displayAdminVenues(arr) {
    dashboard.innerHTML = '';
    arr.forEach(createAdminView);
};

const deleteBtns = document.querySelectorAll('.delete-btn');


function adminDeleteVenue(e) {
    let id = e;
    id= parseInt(id);
    deleteBtn = document.querySelector(`#venue-${id}`);
    
    deleteVenue(id);
}


deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', adminDeleteVenue);
});



function createFeedback(feedback) {
    
    let id = feedback.feedback_id;


    const feedbackList = document.createElement('div');
    feedbackList.classList.add('col');
    feedbackList.classList.add('list');

    const feedbackItem = document.createElement('div');
    
    feedbackItem.classList.add('feedback-item');
    feedbackItem.classList.add('col-xs')
    feedbackItem.classList.add('col-md-12');
    feedbackItem.classList.add('col-lg-10');
    feedbackItem.classList.add('p-2');
    feedbackItem.classList.add('m-auto');
    feedbackItem.classList.add('bg-none');

    feedbackItem.innerHTML = `
        
        <div id='id-${feedback.feedback_id} class='p-3 d-flex flex-direction-row justify-content-evenly'>
            <div class='d-flex flex-direction-row justify-content-between'>
                <span class='px-1 fb-text'>ID: ${feedback.feedback_id}</span>
                <span class='mx-2 fb-text'>${feedback.feedback}</span>
                <span class='px-0 fb-text'>Read: ${feedback.resolved} </span>

                <button id='feedbacks-${feedback.feedback_id}' onclick='adminFeedBackUpdate(${feedback.feedback_id})' type="button" class="px-2 m-0 resolve-btn"><i class="fa fa-check-circle-o" aria-hidden="true"></i></button>
                <button id='feedbacks-${feedback.feedback_id}' onclick='adminFeedBackDelete(${feedback.feedback_id})' type="button" class="px-2 m-0 fb-delete-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
            </div>
        </div>
    `;

    feedbackList.appendChild(feedbackItem);
    feedDash.appendChild(feedbackList);
}


function displayFeedbacks(arr) {
    feedDash.innerHTML = '';
    arr.forEach(feedback => {
        createFeedback(feedback);
    });
}

const resolveBtns = document.querySelectorAll('.resolve-btn');
const fbDeleteBtns = document.querySelectorAll('.fb-delete-btn');


function adminFeedBackUpdate(e) {
    let id = e;
    id = parseInt(id);
    resolveBtn = document.querySelector(`#feedback-${id}`);

    updateFeedback(id);

};

resolveBtns.forEach(resolveBtn => {
    resolveBtn.addEventListener('click', adminFeedBackUpdate);
    
});


function adminFeedBackDelete(e) {
    let id = e;
    id = parseInt(id);
    fbDeleteBtn = document.querySelector(`#feedback-${id}`);

    deleteFeedback(id);
}

fbDeleteBtns.forEach(fbDeleteBtn => {
    fbDeleteBtn.addEventListener('click', adminFeedBackDelete);
});

function showAdminDashboard() {
    dashboard.style.display = 'block';
}

function showFeedbacks() {
    feedDash.style.display = 'block';
}

function showVenues() {
    dashboard.style.display = 'block';
}


// sort venues by id in ascending order
function sortVenuesByIdAsc() {
    let sort = 'venue_id';
    
    getSortedVenues(sort);
}

function sortByVenueNameAsc() {
    let sort = 'venue_name';

    getSortedVenues(sort);
}

function sortByVenueAuthorAsc() {
    let sort = 'author';
    
    getSortedVenues(sort);
}

function sortByVenueLikesAsc() {
    let sort = 'likes';

    getSortedVenues(sort);
}

idBtn.addEventListener('click', sortVenuesByIdAsc);
venueBtn.addEventListener('click', sortByVenueNameAsc);
authorBtn.addEventListener('click', sortByVenueAuthorAsc);
likesBtn.addEventListener('click', sortByVenueLikesAsc);


getAdminVenues();
getFeedbacks();