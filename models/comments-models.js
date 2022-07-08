const connection = require("../db/connection");

exports.destroyCommentById = (comment_id) => {
  return connection
    .query(
      `DELETE FROM comments
    WHERE comment_id = $1
    RETURNING *;`,
      [comment_id]
    )
    .then(({ rows }) => {
      console.log(rows, "<<<<<< models");
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Page not found" });
      }
      return rows;
    });
};
