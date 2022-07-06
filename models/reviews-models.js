const connection = require("../db/connection");

exports.fetchReviewById = (review_id) => {
  return connection
    .query(
      `SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count
     FROM reviews
     LEFT JOIN comments ON comments.review_id = reviews.review_id
     WHERE reviews.review_id = $1
     GROUP BY reviews.review_id`,
      [review_id]
    )
    .then(({ rows }) => {
      console.log(rows);
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Page not found",
        });
      }
      return rows[0];
    });
};

exports.updateReviewById = (review_id, newVote) => {
  const SQLParams = [review_id, newVote];
  return connection
    .query(
      `UPDATE reviews SET votes = votes + $2
        WHERE review_id = $1 RETURNING *`,
      SQLParams
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Page not found" });
      }
      return result.rows[0];
    });
};
