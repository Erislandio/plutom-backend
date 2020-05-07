const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./database/db");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/routes"));

app.listen(port, () => {
  console.log("server listening on port");
  db.then((res) => {
    console.log("db connected");
  });
});
