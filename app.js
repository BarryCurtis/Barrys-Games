const express = require("express");
const app = express();
const getCategories = require("./controllers/categories-controllers");
const {
  getReviewById,
  patchReviews,
} = require("./controllers/reviews-controllers");
const { getUsers } = require("./controllers/users-controllers");

app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReviewById);
app.patch("/api/reviews/:review_id", patchReviews);
app.get("/api/users", getUsers);

app.use("*", (err, req, res) => {
  console.log(msg, "<<<<first error handler");

  res.status(404).send({ msg: "Page not found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.msg === "Bad request") {
    res.status(400).send({ msg: "Error! Invalid ID, bad request" });
  } else res.status(404).send({ msg: "Page not found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Server Error, sorry!" });
});
module.exports = app;
