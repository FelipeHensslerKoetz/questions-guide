const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");

connection
  .authenticate()
  .then(() => console.log("Database connection is OK!"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.post("/question", (req, res) => {
  const { title, description } = req.body;
  Question.create({ title, description })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.listen(3000, (err) => {
  err
    ? console.log("Something went wrong: ", err)
    : console.log("Server is up on port 3000");
});
