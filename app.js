const express = require("express");
const app = express();
const getCategories = require("./controllers/categories-controllers");

app.use(express.json());

app.get("/api/categories", getCategories);

app.use("*", (req, res) => {
  res.status(404).send({ msg: "Bad request, path not found" });
});
module.exports = app;
