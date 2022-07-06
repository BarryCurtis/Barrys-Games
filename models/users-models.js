const connection = require("../db/connection");

exports.fetchUsers = () => {
  return connection.query(`SELECT * FROM users;`).then((result) => {
    return result.rows;
  });
};
