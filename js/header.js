const user_name = document.querySelector('.user_name')
const logOutBtn = document.querySelector('#logOutBtn')

const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
user_name.innerHTML = currentUser.name;

logOutBtn.addEventListener('click', ()=>{
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html'
})