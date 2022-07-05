const connection = require("../db/connection");

exports.fetchReviewById = (review_id) => {
  return connection
    .query(
      `SELECT *
     FROM reviews
     WHERE reviews.review_id = $1`,
      [review_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Page not found",
        });
      }
      return rows[0];
    });
};
