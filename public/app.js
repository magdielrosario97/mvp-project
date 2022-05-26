const container = document.querySelector(".container");
const postContainer = document.querySelector(".postContainer");
const createPostBtn = document.querySelector("#createPostBtn");

// fetch requests
async function getBlogPosts() {
   // local
   // const res = await fetch("http://localhost:5222/blog");

   // deployed
   const res = await fetch("https://formula1-blog.herokuapp.com/blog");

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

      const btns = document.createElement("section");
      btns.setAttribute("class", "editBtns");

      const submitEditBtn = document.createElement("button");
      submitEditBtn.setAttribute("id", "submitEditBtn");
      submitEditBtn.textContent = "Submit Edit";

      const deletePostBtn = document.createElement("button");
      deletePostBtn.setAttribute("id", "deletePostBtn");
      deletePostBtn.textContent = "Delete Post";

      btns.append(submitEditBtn, deletePostBtn);

      postDiv.append(userAndPostTime, postTitle, postBody, btns);

      // Event Listener to Edit and Submit Changes
      postDiv.addEventListener("click", (e) => {
         const clickedID = e.target.id;
         const clickedClass = e.target.className;

         if (clickedID === "post-title" || clickedID === "post-body") {
            postTitle.setAttribute("contentEditable", "true");
            postTitle.style.background = "darkgray";
            postBody.setAttribute("contentEditable", "true");
            postBody.style.background = "lightgray";

            submitEditBtn.style.display = "block";
            deletePostBtn.style.display = "block";
         }

         // Patch post
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
            await fetch(
               `https://formula1-blog.herokuapp.com//blog/${clickedClass}`,
               {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(editedPost),
               }
            );
         }

         // DELETE POST
         async function deletePost() {
            let delModal = document.getElementById("delete-confirmation");
            delModal.style.display = "block";

            // Local
            await fetch(
               `https://formula1-blog.herokuapp.com//blog/${clickedClass}`,
               {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
               }
            );
         }

         submitEditBtn.addEventListener("click", sendEditedPost);
         deletePostBtn.addEventListener("click", deletePost);

         postDiv.addEventListener("mouseleave", (e) => {
            submitEditBtn.style.display = "none";
            deletePostBtn.style.display = "none";
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

   let editModal = document.createElement("div");
   editModal.setAttribute("class", "edit-confirm");

   let modalHeader = document.createElement("div");
   modalHeader.textContent = "Edit Confirmation";
   modalHeader.setAttribute("id", "edit-modal-header");

   let modalBody = document.createElement("div");
   modalBody.textContent = "Your edit has been successfully submitted!";
   modalBody.setAttribute("id", "edit-modal-body");

   let modalConfirmationBtn = document.createElement("button");
   modalConfirmationBtn.textContent = "OK";

   editModal.append(modalHeader, modalBody, modalConfirmationBtn);
   modalBox.append(editModal);

   modalConfirmationBtn.addEventListener("click", () => {
      window.location.reload();
   });

   postContainer.prepend(modalBox);
}
createEditConfirmation();

function createDelConfirmation() {
   let deleteModal = document.createElement("div");
   deleteModal.setAttribute("id", "delete-confirmation");

   let delModContent = document.createElement("div");
   delModContent.setAttribute("class", "delete-confirm");

   let delModHeader = document.createElement("div");
   delModHeader.textContent = "Delete Confirmation";
   delModHeader.setAttribute("id", "del-modal-header");

   let delModBody = document.createElement("div");
   delModBody.textContent = "Your post has been successfully deleted!";
   delModBody.setAttribute("id", "del-modal-body");

   let delModBtn = document.createElement("button");
   delModBtn.textContent = "OK";

   delModContent.append(delModHeader, delModBody, delModBtn);
   deleteModal.append(delModContent);

   delModBtn.addEventListener("click", () => {
      window.location.reload();
   });

   postContainer.prepend(deleteModal);
}

createDelConfirmation();

const populateCreatePost = () => {
   const createPostMod = document.createElement("div");
   createPostMod.setAttribute("id", "create-post-mod");

   const postModHeader = document.createElement("div");
   postModHeader.setAttribute("id", "post-mod-header");
   postModHeader.textContent = "Create Post";

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

   const cancelPostBtn = document.createElement("button");
   cancelPostBtn.setAttribute("id", "cancel-btn");
   cancelPostBtn.textContent = "Cancel";

   postBoxContainer.append(
      userField,
      titleField,
      bodyField,
      submitPostBtn,
      cancelPostBtn
   );
   createPostMod.append(postModHeader, postBoxContainer);
   postContainer.prepend(createPostMod);

   createPostBtn.addEventListener("click", () => {
      createPostMod.style.display = "block";
   });

   cancelPostBtn.addEventListener("click", () => {
      createPostMod.style.display = "none";
   });

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

         await fetch("https://formula1-blog.herokuapp.com//blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
         });
      }
      sendPostToDB();
   });
};
populateCreatePost();

//-------------------Event Listeners------------------------//
createPostBtn.addEventListener("click", () => {});

// loginRegBtn.addEventListener("click", openLoginRegister);

// async function getAllUsers() {
//    const res = await fetch("http://localhost:5222/blog/user");
//    const userData = await res.json();
//    console.log(userData);
//    return userData;
// }

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

// const openLoginRegister = () => {
//    createUserDiv.style.display = "block";
//    postContainer.style.display = "none";
// };
