const { fetchUsers } = require("../models/users-models.js");

exports.getUsers = (req, res, next) => {
  return fetchUsers()
    .then((user) => {
      res.status(200).send({ users: user });
    })
    .catch((err) => {
      next(err);
    });
};
