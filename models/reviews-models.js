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

exports.fetchCommentsByReviewId = (review_id) => {
  return connection
    .query(
      `SELECT * FROM comments
    LEFT JOIN reviews ON comments.review_id = reviews.review_id
    WHERE reviews.review_id = $1`,
      [review_id]
    )
    .then((result) => {
      return result.rows;
    });
};
exports.fetchReviews = (sort_by = "created_at", order = "DESC", category) => {
  const reviews_columns = [
    "title",
    "designer",
    "owner",
    "review_img_url",
    "review_body",
    "category",
    "created_at",
    "votes",
    "review_id",
    "comment_count",
  ];

  if (!reviews_columns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Sort by query invalid" });
  }
  if (!["ASC", "DESC", "asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Order by query invalid" });
  }
  if (category) {
    return connection
      .query(
        `SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count
      FROM reviews
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      WHERE reviews.category = $1
      GROUP BY reviews.review_id
      ORDER BY ${sort_by} ${order}`,
        [category]
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Page not found",
          });
        }
        return rows;
      });
  } else {
    return connection
      .query(
        `SELECT reviews.*, COUNT(comments.review_id)::INT AS comment_count
    FROM reviews
    LEFT JOIN comments ON comments.review_id = reviews.review_id
       GROUP BY reviews.review_id
    ORDER BY ${sort_by} ${order}`
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Page not found",
          });
        }
        return rows;
      });
  }
};

exports.addReviewComment = (review_id, username, body) => {
  if (!username || !body) {
    return Promise.reject({
      status: 400,
      msg: "Invalid object passed please use format {username: , body:}",
    });
  }
  return connection
    .query(
      `INSERT INTO comments
    (body, author, review_id)
    VALUES ($1, $2, $3) RETURNING *;
    `,
      [body, username, review_id]
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
