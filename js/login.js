const logEmail = document.querySelector('#logEmail')
const logPassword = document.querySelector('#logPassword')
const logBtn = document.querySelector('#logBtn')
const loginMsg = document.querySelector('#loginMsg')

const regName = document.querySelector('#regName')
const regEmail = document.querySelector('#regEmail')
const regDate = document.querySelector('#regDate')
const regPassword = document.querySelector('#regPassword')
const regBtn = document.querySelector('#regBtn')
const regMsg = document.querySelector('#regMsg')


class Login {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        if (localStorage.getItem('users')) {
            this.users = JSON.parse(localStorage.getItem('users'))
        } else {
            this.users = [];
        }
    }

    checkEmail() {
        return this.users.find(user => user.email == this.email)
    }
    checkPassword() {
        const email = this.checkEmail();
        
        if(email){
            if(email.password == this.password){
                console.log('login');
                localStorage.setItem('loggedInUser', JSON.stringify(email))
                window.location.href = 'index.html'
            }else{
                loginMsg.innerHTML = 'shifre yanlishdir'
            }
        }else{
            loginMsg.innerHTML = 'Email tapilmadi'
        }
    }
}

class Register extends Login{
    constructor(email, password, name, date){
        super(email, password);
        this.name = name;
        this.date  = date;
    }

    registerMethod(){
        const email = this.checkEmail();
        if(email){
            regMsg.innerHTML = 'email artiq movcuddur'
        }else{
            const newUser ={
                id: this.users.length+1,
                name: this.name,
                email: this.email,
                date: this.date,
                password: this.password,
                country: '',
                city: '',
                image: ''
            }
            this.users.push(newUser)
            localStorage.setItem('users', JSON.stringify(this.users))
        }
    }
}

logBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(logEmail.value !== '' && logPassword.value !== ''){
        const login = new Login(logEmail.value, logPassword.value);
        login.checkPassword();
    }
});

regBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(regEmail.value !== '' && regPassword.value !== '' && regDate.value !== ''){
        const register = new Register(regEmail.value, regPassword.value, regName.value, regDate.value);
        register.registerMethod();
    }
})