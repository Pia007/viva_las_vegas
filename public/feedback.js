const feedDash = document.getElementById('feedback-dash');

const baseUrl = `http://localhost:9007/api`


const feedbackCallback = ({ data: feedbacks }) => {
    console.log(feedbacks);
    displayFeedbacks(feedbacks);
};


const errCallBack = (err) => console.log(err.response.data)

const getFeedbacks = () => axios.get(`${baseURL}/feedbacks`).then(feedbackCallback);
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


getFeedbacks();