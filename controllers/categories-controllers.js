const fetchCategories = require("../models/categories-models");

function getCategories(req, res) {
  return fetchCategories()
    .then((category) => {
      res.status(200).send(category);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getCategories;
