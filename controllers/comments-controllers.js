const { destroyCommentById } = require("../models/comments-models");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  destroyCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
