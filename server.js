require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.static("client-side"));
app.use(express.json());

const PORT = process.env.PORT || 5444;

app.listen(PORT, () => {
   console.log(`Listening on PORT ${PORT}`);
});
