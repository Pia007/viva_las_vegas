const dashboard = document.querySelector('#admin-dash');
const feedDash = document.getElementById('feedback-dash');
const viewVenueBtn = document.querySelector('.v-venues');
const viewFeedbackBtn = document.querySelector('.v-feedbacks');

const baseURL = `http://localhost:9007/api`;

const adminVenuesCallback = ({ data: venues }) => {
    console.log(venues);
    displayAdminVenues(venues);
    console.log(venues);
};

const feedbackCallback = ({ data: feedbacks }) => {
    console.log(feedbacks);
    displayFeedbacks(feedbacks);
};


const errCallBack = (err) => console.log(err.response.data)

const getFeedbacks = () => axios.get(`${baseURL}/admin/feedbacks`).then(feedbackCallback);

const getAdminVenues = () => axios.get(`${baseURL}/venues`).then(adminVenuesCallback);
const deleteVenue = (id) => axios.delete(`${baseURL}/admin/venues/${id}`).then(getAdminVenues).catch(errCallback);
const updateFeedback = (id) => axios.put(`${baseURL}/admin/feedbacks/${id}`).then(getFeedbacks);
const deleteFeedback = (id) => axios.delete(`${baseURL}/admin/feedbacks/${id}`).then(getFeedbacks)


function createAdminView(venue) {
    
    console.log(`Venue ${venue.venue_id}`);
    let id = venue.venue_id;


    const venuesList = document.createElement('div');

    venuesList.classList.add('col');
    venuesList.classList.add('list');

    const venueItem = document.createElement('div');
    
    venueItem.classList.add('venue-item');
    venueItem.classList.add('col')
    // venueItem.classList.add('col-md-6');
    venueItem.classList.add('col-lg-10');
    venueItem.classList.add('p-2');
    venueItem.classList.add('m-auto');
    venueItem.classList.add('bg-none');

    venueItem.innerHTML = `
        
        <div id='id-${venue.venue_id} class='p-3 d-flex flex-direction-row justify-content-evenly'>
            <div class='d-flex flex-direction-row justify-content-between'>
                <span class='px-1 v-text'>ID: ${venue.venue_id}</span>
                <span class='mx-2 v-text'>${venue.venue_name}</span>
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
    console.log(`Delete venue ${id}`);
    deleteBtn = document.querySelector(`#venue-${id}`);
    
    console.log(id);
    
    deleteVenue(id);
    
}


deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', adminDeleteVenue);
});



function createFeedback(feedback) {
    
    console.log(`FeedBack ${feedback.feedback_id}`);
    let id = feedback.feedback_id;


    const feedbackList = document.createElement('div');
    feedbackList.classList.add('col');
    feedbackList.classList.add('list');

    const feedbackItem = document.createElement('div');
    
    feedbackItem.classList.add('feedback-item');
    feedbackItem.classList.add('col-xs')
    feedbackItem.classList.add('col-md-4');
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
    console.log(id);
    console.log(`Update feedback ${id}`);
    resolveBtn = document.querySelector(`#feedback-${id}`);

    updateFeedback(id);

};

resolveBtns.forEach(resolveBtn => {
    resolveBtn.addEventListener('click', adminFeedBackUpdate);
    
});


function adminFeedBackDelete(e) {
    let id = e;
    id = parseInt(id);
    console.log(id);
    console.log(`Delete feedback ${id}`);
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

// viewVenueBtn.addEventListener('click', showVenues);
// viewFeedbackBtn.addEventListener('click', showFeedbacks);


getAdminVenues();
getFeedbacks();