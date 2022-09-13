const loginForm = document.querySelector('#login-form');
const userName = document.querySelector('#username');
const passWord = document.querySelector('#password');
const loginMsg = document.querySelector('#login-msg');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = userName.value;
    const password = passWord.value;

    axios.post('/api/admin/login', {username, password})
    .then(res => {
        window.location.href = 'admin.html';
    }).catch(err => {
        loginMsg.style.visibility = 'visible';
        console.log(err);
    });
});




