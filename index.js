const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/:name/:language", (req, res) => {
  const { name, language } = req.params;
  const showSecretMessage = true;
  const products = [
    { name: "Doritos", price: 3.14 },
    { name: "Ruffles", price: 4.0 },
  ];

  res.render("index", { name, language, showSecretMessage, products });
});

app.listen(3000, (err) => {
  err
    ? console.log("Something went wrong: ", err)
    : console.log("Server is up on port 3000");
});
