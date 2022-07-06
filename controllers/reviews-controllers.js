const {
  fetchReviewById,
  updateReviewById,
  fetchReviews,
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

exports.getReviews = (req, res, next) => {
  fetchReviews()
    .then((reviews) => {
      res.status(200).send(reviews);
    })
    .catch((err) => {
      next(err);
    });
};
