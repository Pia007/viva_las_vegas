const dashboard = document.querySelector('#admin-dash');
const venueHolder = document.querySelector('#venue-holder');
const feedDash = document.getElementById('feedback-dash');

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
const updateFeedback = (id) => axios.put(`${baseURL}/admin/feedbacks/${id}`).then(getFeedbacks)


function createAdminView(venue) {
    
    console.log(`Venue ${venue.venue_id}`);
    let id = venue.venue_id;


    const venuesList = document.createElement('div');
    venuesList.classList.add('col');

    const venueItem = document.createElement('div');
    
    venueItem.classList.add('venue-item');
    venueItem.classList.add('col-xs')
    venueItem.classList.add('col-md-4');
    venueItem.classList.add('col-lg-10');
    venueItem.classList.add('p-2');
    venueItem.classList.add('m-auto');
    venueItem.classList.add('bg-none');

    venueItem.innerHTML = `
        
        <div id='id-${venue.venue_id} class='p-3 d-flex flex-direction-row justify-content-evenly'>
            <div class='d-flex flex-direction-row justify-content-between'>
                <span class='px-1 '>${venue.venue_id}</span>
                <span class='mx-2'>${venue.venue_name}</span>
                <span class='px-0 '>${venue.likes} Likes</span>
                
                <button id='venues-${venue.venue_id}' onclick='adminDeleteVenue(${venue.venue_id})' type="button" class="px-2 m-0 delete-btn">DELETE</button>
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
                <span class='px-1 '>${feedback.feedback_id}</span>
                <span class='mx-2'>${feedback.feedback}</span>
                <span class='px-0 '>${feedback.resolved} </span>

                <button id='feedbacks-${feedback.feedback_id}' onclick='adminFeedBackUpdate(${feedback.feedback_id})' type="button" class="px-2 m-0 resolve-btn">RESOLVE</button>
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


function adminFeedBackUpdate(e) {
    let id = e;
    id = parseInt(id);
    console.log(id);
    console.log(`Update feedback ${id}`);
    resolveBtn = document.querySelector(`#feedback-${id}`);

    updateFeedback(id);
    
};

function showAdminDashboard() {
    dashboard.style.display = 'block';
}

function showFeedbacks() {
    feedDash.style.display = 'block';
}


getAdminVenues();
getFeedbacks();