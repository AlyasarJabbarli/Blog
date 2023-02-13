const prName = document.querySelector('#prName')
const prCountry = document.querySelector('#prCountry')
const prCity = document.querySelector('#prCity')
const prDate = document.querySelector('#prDate')
const prEmail = document.querySelector('#prEmail')
const prBtn = document.querySelector('#prBtn')

const edit_profile_container = document.querySelector('.edit_profile_container')

const name = document.querySelector('#name')
const country = document.querySelector('#country')
const city = document.querySelector('#city')
const birth_year = document.querySelector('#birth_year')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const saveBtn = document.querySelector('#saveBtn')

const profile_img = document.querySelector('.profile_img')
const profileFile = document.querySelector('#profileFile')




class Profile {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users'))
        this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

    }

    showInfo() {
        prName.innerHTML = `Name: ${this.loggedInUser.name}`;
        prCountry.innerHTML = `Country: ${this.loggedInUser.country}`;
        prCity.innerHTML = `City: ${this.loggedInUser.city}`;
        prDate.innerHTML = `Date of birth: ${this.loggedInUser.date}`;
        prEmail.innerHTML = `Email: ${this.loggedInUser.email}`;
        profile_img.src = this.loggedInUser.image;
    }

    setInpValue() {
        name.value = this.loggedInUser.name;
        country.value = this.loggedInUser.country;
        city.value = this.loggedInUser.city;
        birth_year.value = this.loggedInUser.date;
        email.value = this.loggedInUser.email;
        password.value = this.loggedInUser.password;
    }

    setLS(){
        localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
        const index = this.users.findIndex(user => user.id == this.loggedInUser.id);
        this.users[index] = this.loggedInUser;
        localStorage.setItem('users', JSON.stringify(this.users))
        edit_profile_container.style.display = 'none'
        this.showInfo()
    }

    setNewData() {
        this.loggedInUser.name = name.value;
        this.loggedInUser.country = country.value;
        this.loggedInUser.city = city.value;
        this.loggedInUser.date = birth_year.value;
        this.loggedInUser.email = email.value;
        this.loggedInUser.password = password.value;

       this.setLS()
    }

    uploadImage(file) {
        let reader = new FileReader();
        reader.onload = () => {
            this.loggedInUser.image = reader.result;

             this.setLS()

        }
        reader.readAsDataURL(file)
    }
}

const profile = new Profile();
profile.showInfo();

profileFile.addEventListener('input', (e) => {
    profile.uploadImage(e.target.files[0])
})

prBtn.addEventListener('click', () => {
    edit_profile_container.style.display = 'block';
    profile.setInpValue()
})

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (
        name.value !== '' &&
        country.value !== '' &&
        city.value !== '' &&
        birth_year !== '' &&
        email.value !== '' &&
        password.value !== ''
    ) {
        profile.setNewData()
    }
})