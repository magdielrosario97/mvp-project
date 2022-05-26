require("dotenv").config();
const express = require("express");
const app = express();
const pool = require("./database/connection");
const cors = require("cors");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// get the main blog page with all posts and comments
app.get("/blog", async (req, res) => {
   try {
      const mainPage = await pool.query(
         "SELECT * FROM forum ORDER BY time DESC"
      );
      res.json(mainPage.rows);
   } catch (err) {
      res.send(err.message);
   }
});

// get single post
app.get("/blog/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const mainPage = await pool.query(
         "SELECT * FROM forum WHERE post_id = $1",
         [id]
      );
      res.json(mainPage.rows[0]);
   } catch (err) {
      res.send(err.message);
   }
});

// gets all users -------------------------------------------------------
app.get("/blog/user", async (req, res) => {
   try {
      const usersPage = await pool.query("SELECT * FROM poster");
      res.json(usersPage.rows);
   } catch (err) {
      res.send(err.message);
   }
});

// gets specific user -------------------------------------------------------
app.get("/blog/user/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const userIdPage = await pool.query(
         "SELECT * FROM poster WHERE poster_id = $1",
         [id]
      );
      res.json(userIdPage.rows[0]);
   } catch (err) {
      res.send(err.message);
   }
});

// create post -------------------------------------------------------
app.post("/blog", async (req, res) => {
   try {
      const body = req.body;
      const username = body.username;
      const title = body.title || "Untitled";
      const postBody = body.post;
      const postMessage = await pool.query(
         "INSERT INTO forum (time, username, title, post) VALUES (now(), $1, $2, $3)",
         [username, title, postBody]
      );
      res.json(postMessage.rows[0]);
   } catch (err) {
      res.send(err.message);
   }
});

// create user -------------------------------------------------------
app.post("/blog/user", async (req, res) => {
   try {
      const body = req.body;
      const firstN = body.firstName;
      const lastN = body.lastName;
      const userName = body.username;
      const userEmail = body.email;
      const userLoc = body.userLocation || "";
      const aboutUser = body.aboutMe || "";
      const createUser = await pool.query(
         "INSERT INTO poster (firstName, lastName, username, email, userLocation, aboutMe) VALUES ($1, $2, $3, $4, $5, $6)",
         [firstN, lastN, userName, userEmail, userLocation, aboutUser]
      );
      res.json("Successfully created user!");
   } catch (err) {
      res.send(err.message);
   }
});

// update post -------------------------------------------------------
app.patch("/blog/:id", async (req, res) => {
   const id = req.params.id;
   try {
      const postData = await pool.query(
         "SELECT * FROM forum WHERE post_id = $1",
         [id]
      );
      const body = req.body;
      const editTitle = body.title || postData.rows[0].title;
      const editBody = body.post || postData.rows[0].post;
      const editPost = await pool.query(
         "UPDATE forum SET title = $1, post = $2 WHERE post_id = $3",
         [editTitle, editBody, id]
      );
      res.json("Your post has been updated");
   } catch (err) {
      res.send(err.message);
   }
});

// update user -------------------------------------------------------
app.patch("/blog/user/:id", async (req, res) => {
   const id = req.params.id;
   try {
      const userData = await pool.query(
         "SELECT * FROM poster WHERE poster_id = $1",
         [id]
      );
      const body = req.body;
      const userFN = body.firstname || userData.rows[0].firstname;
      const userLN = body.lastname || userData.rows[0].lastname;
      const userName = body.username || userData.rows[0].username;
      const userEmail = body.email || userData.rows[0].email;
      const userLoc = body.userlocation || userData.rows[0].userlocation;
      const userAbout = body.aboutme || userData.rows[0].aboutme;
      const userUpdate = await pool.query(
         "UPDATE poster SET firstName = $1, lastName = $2, username = $3, email = $4, userLocation = $5, aboutMe = $6 WHERE poster_id = $7",
         [userFN, userLN, userName, userEmail, userLoc, userAbout, id]
      );
      res.json("Your profile has been updated");
   } catch (err) {
      res.send(err.message);
   }
});

// delete post -------------------------------------------------------
app.delete("/blog/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deletePost = await pool.query(
         "DELETE FROM forum WHERE post_id = $1",
         [id]
      );
      res.json("Successfully deleted post");
   } catch (err) {
      res.send(err.message);
   }
});

// delete user ---------------------------------------------------------------
app.delete("/blog/user/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deleteUser = await pool.query(
         "DELETE FROM user WHERE poster_id = $1",
         [id]
      );
      res.json("Successfully deleted post");
   } catch (err) {
      res.send(err.message);
   }
});

const PORT = process.env.PORT || 5444;

app.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
});
