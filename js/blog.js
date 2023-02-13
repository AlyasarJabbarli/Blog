const textarea = document.querySelector('#textarea')
const save_blog_btn = document.querySelector('#save_blog_btn')
const blogContainer = document.querySelector('#blogContainer')


class Blog {
    constructor() {
        this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (localStorage.getItem('blogs')) {
            this.blogs = JSON.parse(localStorage.getItem('blogs'))
        } else {
            this.blogs = [];
        }
        this.date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    }

    myBlogs() {
        return this.blogs.filter(data => data.user_id == this.loggedInUser.id).reverse();
    }

    shareBlog() {
        const newBlog = {
            id: this.blogs.length + 1,
            title: textarea.value,
            date: this.date,
            user_id: this.loggedInUser.id,
            like: [],
            image: ''
        }

        this.blogs.push(newBlog);
        localStorage.setItem('blogs', JSON.stringify(this.blogs))
        textarea.value = '';
        this.showBlogs();
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


const blog = new Blog();
blog.showBlogs();
save_blog_btn.addEventListener('click', () => {
    if (textarea.value !== '') {
        blog.shareBlog();
    }
})

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

















// const date = new Date();

// console.log(date.getDate());
// console.log(date.getDay());
// console.log(date.getFullYear());
// console.log(date.getHours());