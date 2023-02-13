const container = document.querySelector('.container');
const blog_cards = document.querySelector('.blog_cards');

class Index {
    constructor() {
        this.blogs = JSON.parse(localStorage.getItem('blogs'))
        this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        this.users = JSON.parse(localStorage.getItem('users'))
    }

    myBlogs() {
        return this.blogs.reverse();
    }

    checkLike(like) {
        if (like.find(data => data.user_id == this.loggedInUser.id)) {
            return 'red'
        } else {
            return 'gray'
        }
    }
    getUser(id){
        return this.users.find(user=> user.id == id).name
    }
    showBlog() {
        container.innerHTML = '';
        this.blogs.forEach(data => {
            container.innerHTML += `
            <div class="blog_cards">
                    <div class="row">
                        <h4 class="blog_title">
                            <a href="user-data.html?id=${data.user_id}">${this.getUser(data.user_id)}</a>
                        </h4>
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
        this.showBlog();
    }

}

const index = new Index();
index.showBlog();


function likeBtn(id) {

    index.likeBlog(id);
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