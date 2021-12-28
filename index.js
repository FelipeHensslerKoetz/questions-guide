const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");
const Answer = require("./database/Answer");

connection.authenticate();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  Question.findAll({ raw: true, order: [["id", "DESC"]] })
    .then((questions) => {
      res.render("index", { questions });
    })
    .catch((err) => console.log(err));
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

app.get("/question/:id", (req, res) => {
  const { id } = req.params;
  Question.findOne({
    where: { id: id },
  })
    .then((question) => {
      if (question) {
        console.log(question);
        res.render("question", { question });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => console.log(err));
});

app.listen(3000, (err) => {
  err
    ? console.log("Something went wrong: ", err)
    : console.log("Server is up on port 3000");
});
