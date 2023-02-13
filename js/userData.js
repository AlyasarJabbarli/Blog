const userImg = document.querySelector('#userImg');
const userName = document.querySelector('#userName');
const userCountry = document.querySelector('#userCountry');
const userCity = document.querySelector('#userCity');
const userDate = document.querySelector('#userDate');
const userEmail = document.querySelector('#userEmail');
const blogContainer = document.querySelector('#blogContainer')
class UserData{
    constructor(){
        this.userId = window.location.search.split('=')[1];
        this.users = JSON.parse(localStorage.getItem('users'))
        this.loggedInUser = this.users.find(user=> user.id == this.userId)
        if (localStorage.getItem('blogs')) {
            this.blogs = JSON.parse(localStorage.getItem('blogs'))
        } else {
            this.blogs = [];
        }
    }

    showData(){
        userName.innerHTML = `Name: ${this.loggedInUser.name}`
        userCountry.innerHTML = `Country: ${this.loggedInUser.country}`
        userCity.innerHTML = `City: ${this.loggedInUser.city}`
        userDate.innerHTML = `Date: ${this.loggedInUser.date}`
        userEmail.innerHTML = `Email: ${this.loggedInUser.email}`
        userImg.src = this.loggedInUser.image
    }
}

class Blogs extends UserData{
    constructor(){
        super();
    }

    myBlogs() {
        return this.blogs.filter(data => data.user_id == this.loggedInUser.id).reverse();
    }

    checkLike(like) {
        if (like.find(data => data.user_id == this.loggedInUser.id)) {
            return 'red'
        } else {
            return 'gray'
        }
    }

    showBlogs() {
        blogContainer.innerHTML = '';
        this.myBlogs().forEach(data => {
            blogContainer.innerHTML += `
            <div class="blog_cards">
                    <div class="row">
                        <p class="blog_date">${data.date}</p>
                    </div>
                    <img alt="blog img" class="blog_img" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
                    <div class="icon_container">
                        <i onclick="likeBtn(${data.id})" style="color: ${this.checkLike(data.like)}" class="fas fa-heart"></i>
                        <span>${data.like.length}</span>
                    </div>
                    <p class="blog_paragraph"> ${data.title} </p>
                    <button onclick="readMoreBtn(event)" class="read_more_btn">Read more</button>
                
                </div>
            `
        });
    }

    likeBlog(id) {
        const findBlog = this.blogs.find(data => data.id == id);
        const index = this.blogs.findIndex(data => data.id == id);

        const checkList = findBlog.like.findIndex(user => user.user_id == this.loggedInUser.id);
        if (checkList != -1) {
            findBlog.like.splice(checkList, 1)
        } else {
            findBlog.like.push({
                user_id: this.loggedInUser.id
            })
        }
        this.blogs[index] = findBlog;
        localStorage.setItem('blogs', JSON.stringify(this.blogs))
        this.showBlogs();
    }

}
const blog = new Blogs();
blog.showBlogs();
const userData = new UserData();
userData.showData();

function likeBtn(id) {
    blog.likeBlog(id);
}

function readMoreBtn(e) {
    const parag = e.target.parentElement.children[3];
    if (parag.style.height == '' || parag.style.height == '63px') {
        parag.style.height = 'auto'
    } else {
        parag.style.height = '63px'
    }
    console.log(parag.style.height);
}