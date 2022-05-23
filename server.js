require("dotenv").config();
const express = require("express");
const app = express();
const pool = require("./database/connection");

app.use(express.static("client-side"));

app.get("/", async (req, res) => {
   try {
      const mainPage = await pool.query("SELECT * FROM forum");
      res.json(mainPage.rows);
   } catch (err) {
      res.send(err.message);
   }
});

app.get("/user", async (req, res) => {
   try {
      const mainPage = await pool.query(
         "SELECT first_name, last_name, username FROM poster"
      );
      res.json(mainPage.rows);
   } catch (err) {
      res.send(err.message);
   }
});

const PORT = process.env.PORT || 5444;

app.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
});
