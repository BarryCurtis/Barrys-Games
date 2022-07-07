const {
  fetchReviewById,
  updateReviewById,
  fetchCommentsByReviewId,
} = require("../models/reviews-models");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send(review);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviews = (req, res, next) => {
  const { review_id } = req.params;
  const newVote = req.body.inc_votes;

  if (typeof newVote !== "number") {
    next({ msg: "Bad request" });
  }

  if (!req.body.inc_votes) {
    next({ msg: "Bad request" });
  }
  updateReviewById(review_id, newVote)
    .then((review) => {
      res.status(200).send(review);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id).catch((err) => {
    next(err);
  });
  fetchCommentsByReviewId(review_id)
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch((err) => {
      next(err);
    });
};
