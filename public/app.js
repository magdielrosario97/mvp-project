const container = document.querySelector(".container");
const postContainer = document.querySelector(".postContainer");
const createUserDiv = document.querySelector(".createUser");
const loginRegBtn = document.querySelector("#loginBtn");
const createPostBtn = document.querySelector("#createPostBtn");
const createPostBox = document.querySelector(".createPostBox");

//------- Styling Manipulation -------//
const openLoginRegister = () => {
   createUserDiv.style.display = "block";
   postContainer.style.display = "none";
};

// fetch requests
async function getBlogPosts() {
   // local
   const res = await fetch("http://localhost:5222/blog");

   // deployed
   // const res = await fetch("http://");
   const blogData = await res.json();
   console.log(blogData);
   createBlogForum(blogData);
}

getBlogPosts();

//------------- DOM Manipulation Functions -------------------//
const createBlogForum = (blogData) => {
   for (let i = 0; i < blogData.length; i++) {
      const postDiv = document.createElement("div");
      postDiv.setAttribute("class", "post");
      postContainer.append(postDiv);

      const postTitle = document.createElement("h4");
      postTitle.textContent = blogData[i].title;

      let timePosted = blogData[i].time;
      timePosted = `${timePosted.slice(0, 10)} ${timePosted.slice(11, 19)}`;
      const postTime = document.createElement("time");
      postTime.textContent = `${timePosted}`;

      const postBody = document.createElement("p");
      postBody.textContent = `@: ${blogData[i].post}`;
      postDiv.append(postTitle, postTime, postBody);
   }
};

const openCreatePost = () => {
   const postBoxContainer = document.createElement("form");
   const titleField = document.createElement("input");
   titleField.setAttribute("type", "text");
   titleField.setAttribute("placeholder", "Title");
   const userField = document.createElement("input");
   userField.setAttribute("type", "text");
   userField.setAttribute("placeholder", "Username");
   const bodyField = document.createElement("textarea");
   bodyField.setAttribute("placeholder", "Write your thoughts...");
   const submitPostBtn = document.createElement("input");
   submitPostBtn.setAttribute("type", "submit");

   postBoxContainer.append(titleField, userField, bodyField, submitPostBtn);
   postContainer.prepend(postBoxContainer);

   postBoxContainer.style.display = "block";
};

const createUser = () => {
   const createUserContainer = document.createElement("form");
   const firstNField = document.createElement("input");
   firstNField.setAttribute("type", "text");
   firstNField.setAttribute("placeholder", "First Name");
   const lastNField = document.createElement("input");
   lastNField.setAttribute("type", "text");
   lastNField.setAttribute("placeholder", "Last Name");
   const usernameField = document.createElement("input");
   usernameField.setAttribute("type", "text");
   usernameField.setAttribute("placeholder", "Username");
   const emailField = document.createElement("input");
   emailField.setAttribute("type", "text");
   emailField.setAttribute("placeholder", "Email");
   const userLocation = document.createElement("input");
   userLocation.setAttribute("type", "text");
   userLocation.setAttribute("placeholder", "City, State");
   const aboutField = document.createElement("textarea");
   aboutField.setAttribute("placeholder", "About you");

   const registerUserBtn = document.createElement("input");
   const CancelRegBtn = document.createElement("button");
};

//-------------------Event Listeners------------------------//
createPostBtn.addEventListener("click", openCreatePost);
loginRegBtn.addEventListener("click", openLoginRegister);

// async function getAllUsers() {
//    const res = await fetch("http://localhost:5222/blog/user");
//    const userData = await res.json();
//    console.log(userData);
//    return userData;
// }

// Working out how to access the data from another function to create the blog forum page. START ON THIS FILE
