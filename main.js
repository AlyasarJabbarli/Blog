const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
const fullNameElement = document.getElementById("profileFullName")
fullNameElement.innerHTML = `${loggedInUser.firstName} ${loggedInUser.lastName}`

function logout() {
    localStorage.removeItem("loggedInUser")
    location.reload()
}

const upload_img_btn = document.querySelector('.upload_img_btn');
const upload_blog_img = document.querySelector('#upload_blog_img');
const uploaded_img_as_blog = document.querySelector('.uploaded_img_as_blog')

upload_img_btn.addEventListener('click', ()=>{
    // console.log(upload_blog_img.files[0])
})
upload_blog_img.addEventListener('change', (e)=>{
   

    let reader = new FileReader();
    reader.onload = () => {
        localStorage.setItem('img', reader.result)
    
    }

    reader.readAsDataURL(e.target.files[0])
})


if(localStorage.getItem('img')){
    uploaded_img_as_blog.style.display = 'block';
    uploaded_img_as_blog.src = localStorage.getItem('img');
}