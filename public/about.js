const feedbackForm = document.getElementById('feedback-form');


const baseURL = `http://localhost:9007/api`


const feedbackCallback = ({ data: feedbacks }) => {
    console.log(feedbacks);
    displayFeedbacks(feedbacks);
};


// const errCallBack = (err) => console.log(err.response.data)

const getFeedbacks = () => axios.get(`${baseURL}/feedbacks`).then(feedbackCallback);
const addFeedback = (body) => axios.post(`${baseURL}/feedbacks`, body);


// function to submit feedback
function submitFeedback(e) {
    e.preventDefault();

    let feedback = document.querySelector('#feedback-text').value;

    let newFeedback = {
        feedback: feedback,
        resolved: false
    }; 

    console.log(feedback);

    // createFeedback(newFeedback);

    //reset the form    
    feedbackForm.reset();

    addFeedback(newFeedback);
    
}


function displayFeedback(arr) {
    feedDash.innerHTML = '';
    arr.forEach(createFeedback);
};

feedbackForm.addEventListener('submit', submitFeedback);

