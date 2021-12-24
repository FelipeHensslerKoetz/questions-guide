const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/:name/:language", (req, res) => {
  const { name, language } = req.params;
  const showSecretMessage = true;

  res.render("index", { name, language, showSecretMessage });
});

app.listen(3000, (err) => {
  err
    ? console.log("Something went wrong: ", err)
    : console.log("Server is up on port 3000");
});
