const express = require("express");
const app = express();
const getCategories = require("./controllers/categories-controllers");
const { getReviewById } = require("./controllers/reviews-controllers");
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);

app.use("*", (err, req, res) => {
  console.log(msg, "<<<<first error handler");

  res.status(404).send({ msg: "Page not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Error! Invalid ID, bad request" });
  } else res.status(404).send({ msg: "Page not found" });
});

module.exports = app;
