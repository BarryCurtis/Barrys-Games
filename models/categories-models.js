const connection = require("../db/connection");

function fetchCategories() {
  return connection
    .query(
      `SELECT * FROM categories
;`
    )
    .then((result) => {
      return result.rows;
    });
}

module.exports = fetchCategories;
