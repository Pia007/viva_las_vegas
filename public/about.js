const feedbackForm = document.getElementById('feedback-form');
const feedbackmsg = document.querySelector('.feedback-msg');

const baseURL = `http://localhost:9007/api`

const feedbackCallback = ({ data: feedbacks }) => {
    displayFeedbacks(feedbacks);
};

const getFeedbacks = () => axios.get(`api/feedbacks`).then(feedbackCallback);
const addFeedback = (body) => axios.post(`api/feedbacks`, body);


function submitFeedback(e) {
    e.preventDefault();

    let feedback = document.querySelector('#feedback-text').value;

    let newFeedback = {
        feedback: feedback,
        status: 'Unread'
    }; 

    
    feedbackForm.reset();

    feedbackMsg.style.visibility = 'visible';

    addFeedback(newFeedback);
}

function displayFeedback(arr) {
    feedDash.innerHTML = '';
    arr.forEach(createFeedback);
};

feedbackForm.addEventListener('submit', submitFeedback);

