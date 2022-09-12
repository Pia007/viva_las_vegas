const loginForm = document.querySelector('#login-form');
const userName = document.querySelector('#username');
const passWord = document.querySelector('#password');
const loginMsg = document.querySelector('#login-msg');

// write axios post request to login admin
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = userName.value;
    console.log(username);
    
    const password = passWord.value;
    console.log(password);
    axios.post('/api/admin/login', {username, password})
    .then(res => {
        console.log(res.data);
        window.location.href = 'admin.html';
    }).catch(err => {
        loginMsg.style.visibility = 'visible';
        console.log(err);
    });
});




