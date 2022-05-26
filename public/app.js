const container = document.querySelector(".container");
const postContainer = document.querySelector(".postContainer");
const createPostBtn = document.querySelector("#createPostBtn");
const randomPostBtn = document.querySelector("#getRandomPost");
const returnToMain = document.querySelector("#returnToMain");

let localURL = "http://localhost:5222";
let deployedURL = "https://formula1-blog.herokuapp.com";

// fetch all
async function getBlogPosts() {
   const res = await fetch(`${deployedURL}/blog`);

   const blogData = await res.json();
   createBlogForum(blogData);
}

getBlogPosts();

randomPostBtn.addEventListener("click", () => {
   const postAccess = document.querySelectorAll(".post");
   const postCountArr = [];
   for (let i = 0; i < postAccess.length; i++) {
      const postIDNum = postAccess[i].id;
      postAccess[i].style.display = "none";
      postCountArr.push(postIDNum);
   }
   const randomNum = Math.floor(Math.random() * postCountArr.length);
   const randomID = postCountArr[randomNum];
   const showPost = postAccess[randomNum];
   showPost.style.display = "block";

   async function getSinglePost() {
      const res = await fetch(`${deployedURL}/blog/${randomID}`);

      const postData = await res.json();
      createBlogForum(postData);
   }
   getSinglePost();
});

returnToMain.addEventListener("click", () => {
   const postAccess = document.querySelectorAll(".post");
   for (let i = 0; i < postAccess.length; i++) {
      postAccess[i].style.display = "block";
   }
});

//------------- DOM Manipulation Functions -------------------//
const createBlogForum = (blogData) => {
   for (let i = 0; i < blogData.length; i++) {
      const postDiv = document.createElement("div");
      postDiv.setAttribute("class", "post");
      postDiv.setAttribute("id", `${blogData[i]["post_id"]}`);
      postContainer.append(postDiv);

      let user = blogData[i].username;
      let timePosted = blogData[i].time;
      timePosted = `${timePosted.slice(0, 10)} • ${timePosted.slice(11, 19)}`;
      const userAndPostTime = document.createElement("div");
      userAndPostTime.textContent = `@${user} • ${timePosted}`;
      userAndPostTime.setAttribute("id", "postInfo");

      const postTitle = document.createElement("h4");
      postTitle.setAttribute("id", "post-title");
      postTitle.setAttribute("contentEditable", "false");
      postTitle.textContent = blogData[i].title;

      const postBody = document.createElement("p");
      postBody.setAttribute("id", "post-body");
      postBody.setAttribute("contentEditable", "false");
      postBody.textContent = `${blogData[i].post}`;

      const editLogo = document.createElement("button");
      editLogo.setAttribute("class", "openEdit");
      editLogo.setAttribute("id", `${blogData[i]["post_id"]}`);
      editLogo.textContent = "•••";
      userAndPostTime.append(editLogo);

      const editBtnsDiv = document.createElement("div");
      editBtnsDiv.setAttribute("class", "editBtns");

      const submitEditBtn = document.createElement("button");
      submitEditBtn.setAttribute("id", "submitEditBtn");
      submitEditBtn.textContent = "Submit Edit";

      const deletePostBtn = document.createElement("button");
      deletePostBtn.setAttribute("id", "deletePostBtn");
      deletePostBtn.textContent = "Delete Post";

      const cancelEditBtn = document.createElement("button");
      cancelEditBtn.setAttribute("id", "cancelEditBtn");
      cancelEditBtn.textContent = "Cancel";

      editBtnsDiv.append(cancelEditBtn, deletePostBtn, submitEditBtn);

      postDiv.append(userAndPostTime, postTitle, postBody, editBtnsDiv);

      // Event Listener to Edit and Submit Changes
      editLogo.addEventListener("click", (e) => {
         const postID = e.target.id;

         const postAccess = document.querySelectorAll(".post");
         for (let i = 0; i < postAccess.length; i++) {
            if (postAccess[i].id !== postID) {
               postAccess[i].style.display = "none";
            }
         }

         postTitle.setAttribute("contentEditable", "true");
         postBody.setAttribute("contentEditable", "true");
         postTitle.style.backgroundColor = "darkgray";
         postBody.style.backgroundColor = "gray";
         submitEditBtn.style.display = "block";
         deletePostBtn.style.display = "block";
         cancelEditBtn.style.display = "block";

         // Patch post
         async function sendEditedPost() {
            let editedTitle = document.getElementById("post-title").textContent;
            let editedBody = document.getElementById("post-body").textContent;
            let confirmModal = document.getElementById("edit-confirmation");
            confirmModal.style.display = "block";

            const editedPost = {
               post_id: postID,
               title: editedTitle,
               post: editedBody,
            };
            console.log(editedPost);

            await fetch(`${deployedURL}/blog/${postID}`, {
               method: "PATCH",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(editedPost),
            });
         }

         // DELETE POST
         async function deletePost() {
            let delModal = document.getElementById("delete-confirmation");
            delModal.style.display = "block";

            await fetch(`${deployedURL}/blog/${postID}`, {
               method: "DELETE",
               headers: { "Content-Type": "application/json" },
            });
         }

         submitEditBtn.addEventListener("click", sendEditedPost);
         deletePostBtn.addEventListener("click", deletePost);
         cancelEditBtn.addEventListener("click", () => {
            postTitle.setAttribute("contentEditable", "false");
            postBody.setAttribute("contentEditable", "false");
            postTitle.style.backgroundColor = "transparent";
            postBody.style.backgroundColor = "transparent";
            submitEditBtn.style.display = "none";
            deletePostBtn.style.display = "none";
            cancelEditBtn.style.display = "none";
            const postAccess = document.querySelectorAll(".post");
            for (let i = 0; i < postAccess.length; i++) {
               postAccess[i].style.display = "block";
            }
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
      postBoxContainer.reset();
   });

   submitPostBtn.addEventListener("click", () => {
      async function sendPostToDB() {
         let usernameValue = document.getElementById("postUsername").value;
         let titleValue = document.getElementById("postTitle").value;
         let bodyValue = document.getElementById("postBody").value;

         const newPost = {
            username: usernameValue,
            title: titleValue,
            post: bodyValue,
         };

         await fetch(`${deployedURL}/blog`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost),
         });
      }
      sendPostToDB();
   });
};
populateCreatePost();
