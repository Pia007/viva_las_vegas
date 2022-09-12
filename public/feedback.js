const feedDash = document.getElementById('feedback-dash');
// const feedbackForm = document.getElementById('feedback-form');

const baseUrl = `http://localhost:9007/api`


const feedbackCallback = ({ data: feedbacks }) => {
    console.log(feedbacks);
    displayFeedbacks(feedbacks);
};


const errCallBack = (err) => console.log(err.response.data)

const getFeedbacks = () => axios.get(`${baseURL}/feedbacks`).then(feedbackCallback);
// const addFeedback = (body) => axios.put(`${baseUrl}/feedbacks`, body).then(getFeedbacks).catch(errCallBack);

// function to submit feedback
// function submitFeedback(e) {
//     e.preventDefault();

//     let feedback = document.querySelector('#feedback-text');

//     let newFeedback = {
//         feedback: feedback.value,
//         resolved: false
//     }; 

//     console.log(feedback);

//     createFeedback(newFeedback);

//     feedback.value = '';

//     addFeedback(newFeedback);
    
// }

function createFeedback(feedback) {
    
    console.log(`FeedBack ${feedback.feedback_id}`);
    let id = feedback.feedback_id;


    const feedbackList = document.createElement('div');
    feedbackList.classList.add('col');

    const feedbackItem = document.createElement('div');
    
    //  = feedback_id;
    // console.log(comment-id);
    
    feedbackItem.classList.add('feedback-item');
    feedbackItem.classList.add('col-xs')
    feedbackItem.classList.add('col-md-4');
    feedbackItem.classList.add('col-lg-10');
    feedbackItem.classList.add('p-2');
    feedbackItem.classList.add('m-auto');
    feedbackItem.classList.add('bg-none');

    // feedbacksList.classList.add('p-2');
    // feedbacksList.classList.add('m-2');

    feedbackItem.innerHTML = `
        
        <div id='id-${feedback.feedback_id} class='p-3 d-flex flex-direction-row justify-content-evenly'>
            <div class='d-flex flex-direction-row justify-content-between'>
                <span class='px-1 '>${feedback.feedback_id}</span>
                <span class='mx-2'>${feedback.feedback}</span>
                <span class='px-0 '>${feedback.resolved} </span>
            </div>
        </div>
        
        
        
    `;

    feedbackList.appendChild(feedbackItem);
    feedDash.appendChild(feedbackList);
}

{/* <button id='feedbacks-${feedback.feedback_id}' onclick='adminDeletefeedback(${feedback.feedback_id})' type="button" class="px-2 m-0 delete-btn">DELETE</button> */}

function displayFeedbacks(arr) {
    feedDash.innerHTML = '';
    arr.forEach(feedback => {
        createFeedback(feedback);
    });
}

// feedbackForm.addEventListener('submit', submitFeedback);


getFeedbacks();