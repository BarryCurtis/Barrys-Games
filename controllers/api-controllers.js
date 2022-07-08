const endpoints = require("../endpoints.json");

exports.fetchEndPoints = (req, res, next) => {
  res.status(200).send({ endpoints: endpoints });
};
