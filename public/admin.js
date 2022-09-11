const dashboard = document.querySelector('#admin-dash');
const venueHolder = document.querySelector('#venue-holder');


const baseURL = `http://localhost:9007/api`;

const adminVenuesCallback = ({ data: venues }) => {
    console.log(venues);
    displayAdminVenues(venues);
    console.log(venues);
};

// const commentsCallback = ({ data: comments }) => {
//     displayComments(comments);
    
// };
const errCallback = (err) => console.log(err.response.data);

const getAdminVenues = () => axios.get(`${baseURL}/venues`).then(adminVenuesCallback);
const deleteVenue = (id) => axios.delete(`${baseURL}/admin/venues/${id}`).then(getAdminVenues).catch(errCallback);

function createAdminView(venue) {
    
    console.log(`Venue ${venue.venue_id}`);
    let id = venue.venue_id;


    const venuesList = document.createElement('div');
    venuesList.classList.add('col');

    const venueItem = document.createElement('div');
    
    //  = venue_id;
    // console.log(comment-id);
    
    venueItem.classList.add('venue-item');
    venueItem.classList.add('col-xs')
    venueItem.classList.add('col-md-4');
    venueItem.classList.add('col-lg-10');
    venueItem.classList.add('p-2');
    venueItem.classList.add('m-auto');
    venueItem.classList.add('bg-none');

    // venuesList.classList.add('p-2');
    // venuesList.classList.add('m-2');

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


//function to delete venue
function adminDeleteVenue(e) {
    let id = e;
    id= parseInt(id);
    console.log(`Delete venue ${id}`);
    deleteBtn = document.querySelector(`#venue-${id}`);
    // get the venue id from the button
    

    console.log(id);
    

    deleteVenue(id);
    
}

deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', adminDeleteVenue);
});
getAdminVenues();