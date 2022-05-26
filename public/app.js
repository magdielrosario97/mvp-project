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

const openCreatePost = () => {
   createPostBox.style.display = "block";
};

// fetch requests
async function getBlogPosts() {
   // local
   const res = await fetch("http://localhost:5222/blog");

   // deployed
   // const res = await fetch("https://formula1-blog.herokuapp.com/blog");

   const blogData = await res.json();
   createBlogForum(blogData);
}

getBlogPosts();

//------------- DOM Manipulation Functions -------------------//
const createBlogForum = (blogData) => {
   for (let i = 0; i < blogData.length; i++) {
      const postDiv = document.createElement("div");
      postDiv.setAttribute("class", "post");
      postContainer.append(postDiv);

      let user = blogData[i].username;
      let timePosted = blogData[i].time;
      timePosted = `${timePosted.slice(0, 10)} • ${timePosted.slice(11, 19)}`;
      const userAndPostTime = document.createElement("div");
      userAndPostTime.textContent = `@${user} • ${timePosted}`;

      const postTitle = document.createElement("h4");
      postTitle.setAttribute("id", "post-title");
      postTitle.setAttribute("class", `${blogData[i]["post_id"]}`);
      postTitle.setAttribute("contentEditable", "false");
      postTitle.textContent = blogData[i].title;

      const postBody = document.createElement("p");
      postBody.setAttribute("id", "post-body");
      postBody.setAttribute("class", `${blogData[i]["post_id"]}`);
      postBody.setAttribute("contentEditable", "false");
      postBody.textContent = `${blogData[i].post}`;

      const submitEditBtn = document.createElement("button");
      submitEditBtn.setAttribute("id", "submitEditBtn");
      submitEditBtn.textContent = "Submit Edit";

      postDiv.append(userAndPostTime, postTitle, postBody, submitEditBtn);

      // Event Listener to Edit and Submit Changes
      postDiv.addEventListener("click", (e) => {
         const clickedID = e.target.id;
         const clickedClass = e.target.className;
         console.log(clickedID);
         console.log(clickedClass);

         if (clickedID === "post-title" || clickedID === "post-body") {
            postTitle.setAttribute("contentEditable", "true");
            postTitle.style.background = "darkgray";
            postBody.setAttribute("contentEditable", "true");
            postBody.style.background = "darkgray";

            submitEditBtn.style.display = "block";
         }

         async function sendEditedPost() {
            let editedTitle = document.getElementById("post-title").textContent;
            let editedBody = document.getElementById("post-body").textContent;
            let confirmModal = document.getElementById("edit-confirmation");
            confirmModal.style.display = "block";

            const editedPost = {
               post_id: clickedClass,
               title: editedTitle,
               post: editedBody,
            };

            // Local
            await fetch(`http://localhost:5222/blog/${clickedClass}`, {
               method: "PATCH",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(editedPost),
            });
         }
         submitEditBtn.addEventListener("click", sendEditedPost);

         postDiv.addEventListener("mouseleave", (e) => {
            submitEditBtn.style.display = "none";
            postTitle.setAttribute("contentEditable", "false");
            postTitle.style.background = "none";
            postBody.setAttribute("contentEditable", "false");
            postBody.style.background = "none";
         });
      });
   }
};

function createEditConfirmation() {
   let modalBox = document.createElement("div");
   modalBox.setAttribute("id", "edit-confirmation");
   modalBox.textContent = "Your edit has successfully been submitted!";
   let modalConfirmationBtn = document.createElement("button");
   modalConfirmationBtn.textContent = "OK";
   modalBox.append(modalConfirmationBtn);
   modalConfirmationBtn.addEventListener("click", () => {
      window.location.reload();
   });

   postContainer.prepend(modalBox);
}

createEditConfirmation();

const populateCreatePost = () => {
   const postBoxContainer = document.createElement("form");
   const titleField = document.createElement("input");
   titleField.setAttribute("id", "postTitle");
   titleField.setAttribute("placeholder", "Title");
   const userField = document.createElement("input");
   userField.setAttribute("id", "postUsername");
   userField.setAttribute("placeholder", "Username");
   userField.setAttribute("required", "");
   const bodyField = document.createElement("textarea");
   bodyField.setAttribute("id", "postBody");
   bodyField.setAttribute("placeholder", "Write your thoughts...");
   bodyField.setAttribute("required", "");

   const submitPostBtn = document.createElement("input");
   submitPostBtn.setAttribute("type", "submit");
   submitPostBtn.addEventListener("click", () => {
      async function sendPostToDB() {
         let usernameValue = document.getElementById("postUsername").value;
         let titleValue = document.getElementById("postTitle").value;
         let bodyValue = document.getElementById("postBody").value;

         const newPost = {
            username: usernameValue,
            title: titleValue,
            body: bodyValue,
         };
         // Local
         await fetch("http://localhost:5222/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
         });
         // Deployed
         // await fetch("https://formula1-blog.herokuapp.com/blog", {
         //    method: "POST",
         //    headers: { "Content-Type": "application/json" },
         //    body: JSON.stringify(newPost),
         // });
      }
      sendPostToDB();
   });

   postBoxContainer.append(titleField, userField, bodyField, submitPostBtn);
   createPostBox.prepend(postBoxContainer);
   postBoxContainer.style.display = "block";
};
populateCreatePost();

// const createUser = () => {
//    const createUserContainer = document.createElement("form");
//    const firstNField = document.createElement("input");
//    firstNField.setAttribute("placeholder", "First Name");
//    const lastNField = document.createElement("input");
//    lastNField.setAttribute("placeholder", "Last Name");
//    const usernameField = document.createElement("input");
//    usernameField.setAttribute("placeholder", "Username");
//    const emailField = document.createElement("input");
//    emailField.setAttribute("placeholder", "Email");
//    const userLocation = document.createElement("input");
//    userLocation.setAttribute("placeholder", "City, State");
//    const aboutField = document.createElement("textarea");
//    aboutField.setAttribute("placeholder", "About you");

//    const registerUserBtn = document.createElement("input");
//    registerUserBtn.setAttribute("type", "submit");
//    const cancelRegBtn = document.createElement("button");

//    createUserContainer.append(
//       firstNField,
//       lastNField,
//       usernameField,
//       emailField,
//       userLocation,
//       aboutField,
//       registerUserBtn,
//       cancelRegBtn
//    );

//    createUserDiv.append(createUserContainer);
// };

// createUser();
//-------------------Event Listeners------------------------//
createPostBtn.addEventListener("click", openCreatePost);
// loginRegBtn.addEventListener("click", openLoginRegister);

// async function getAllUsers() {
//    const res = await fetch("http://localhost:5222/blog/user");
//    const userData = await res.json();
//    console.log(userData);
//    return userData;
// }

// Working out how to access the data from another function to create the blog forum page. START ON THIS FILE
