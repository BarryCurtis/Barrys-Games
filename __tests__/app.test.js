const connection = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => connection.end());

describe("#3 GET /api/categories", () => {
  test("200 response returns with an array", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body: { categories } }) => {
        expect(categories).toBeInstanceOf(Array);
      });
  });
  test("200 response returns array of objects with specific properties", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body: { categories } }) => {
        categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
  test("404 response returns an error page not found", () => {
    return request(app)
      .get("/api/categor")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Page not found");
      });
  });
});

describe("#4 GET /api/reviews/:review_id", () => {
  test("200 response returns an object containing specified properties", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual(
          expect.objectContaining({
            review_id: expect.any(Number),
            title: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_img_url: expect.any(String),
            review_body: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  test("400 response returns a bad request error when an invalid id is requested", () => {
    return request(app)
      .get("/api/reviews/notAValidId")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Error! Invalid ID, bad request");
      });
  });
  test("404 response returns a path not found error when an ID is valid but does not exist ", () => {
    return request(app)
      .get("/api/reviews/9090")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Page not found");
      });
  });
});

describe("#5 PATCH /api/reviews/:review_id", () => {
  test("200 response returns review with updated votes", () => {
    const votesObj = { inc_votes: 1 };
    return request(app)
      .patch("/api/reviews/1")
      .send(votesObj)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Farmyard fun!",
          review_id: 1,
          category: "euro game",
          created_at: "2021-01-18T10:00:20.514Z",
          votes: 2,
        });
      });
  });
  test("404 response returns error page not found when a review doesn't exist ", () => {
    const votesObj = { inc_votes: 1 };
    return request(app)
      .patch("/api/reviews/9090")
      .expect(404)
      .send(votesObj)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Page not found");
      });
  });
  test("400 response returns bad request error when passed a string", () => {
    const votesObj = { inc_votes: 1 };
    return request(app)
      .patch("/api/reviews/notAValidId")
      .expect(400)
      .send(votesObj)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Error! Invalid ID, bad request");
      });
  });
  test("400 response returns a bad request error when passed an invalid increases votes object key", () => {
    const votesObj = { inc_voles: 1 };
    return request(app)
      .patch("/api/reviews/1")
      .expect(400)
      .send(votesObj)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Error! Invalid ID, bad request");
      });
  });
  test("400 response returns a bad request error when passed an invalid increases votes object value", () => {
    const votesObj = { inc_votes: "notValid" };
    return request(app)
      .patch("/api/reviews/1")
      .expect(400)
      .send(votesObj)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Error! Invalid ID, bad request");
      });
  });
});

describe("#6 GET /api/users", () => {
  test("200 response returns an array of objects with the specified properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
  test("404 response returns an error page not found", () => {
    return request(app)
      .get("/api/user")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Page not found");
      });
  });
});

describe("#7 GET /api/reviews/:review_id (comment count()", () => {
  test("200 response returns an object which contains comment_count", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual(
          expect.objectContaining({
            review_id: expect.any(Number),
            title: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_img_url: expect.any(String),
            review_body: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          })
        );
      });
  });
  test("400 response returns a bad request error when an invalid id is requested", () => {
    return request(app)
      .get("/api/reviews/notAValidId")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Error! Invalid ID, bad request");
      });
  });
  test("404 response returns a path not found error when an ID is valid but does not exist ", () => {
    return request(app)
      .get("/api/reviews/9090")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Page not found");
      });
  });
});

describe("#8 GET /api/reviews", () => {
  test("200 response returns an array of objects with specific properties", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBeGreaterThan(0);
        body.reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              review_body: expect.any(String),
              designer: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("#9 GET /api/reviews/:review_id/comments", () => {
  test("200 response returns an array of comments for the given review_id", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Array);
        body.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              review_id: expect.any(Number),
            })
          );
        });
      });
  });
  test("200 response when trying to return from a review with zero comments", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([]);
      });
  });
  test("400 response when inputting the wrong path", () => {
    return request(app)
      .get("/api/reviews/string/comments")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Error! Invalid ID, bad request");
      });
  });
  test("404 response when invalid review is given", () => {
    return request(app)
      .get("/api/reviews/9999/comments")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Page not found");
      });
  });
});

describe("#10 POST /api/reviews/:review_id/comments", () => {
  test("201 response returns a posted comment", () => {
    const objComment = { username: "bainesface", body: "What a great game" };
    return request(app)
      .post("/api/reviews/3/comments")
      .send(objComment)
      .expect(201)
      .then(({ body: { addedComment } }) => {
        expect(addedComment).toEqual(
          expect.objectContaining({
            body: expect.any(String),
            votes: expect.any(Number),
            author: expect.any(String),
            review_id: expect.any(Number),
            created_at: expect.any(String),
          })
        );
      });
  });
  test("400 response returns bad request when given an empty object", () => {
    const objComment = {};
    return request(app)
      .post("/api/reviews/3/comments")
      .send(objComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(
          "Invalid object passed please use format {username: , body:}"
        );
      });
  });
  test("400 response returns bad request when given an invalid object", () => {
    const objComment = { body: "What a great game" };
    return request(app)
      .post("/api/reviews/3/comments")
      .send(objComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe(
          "Invalid object passed please use format {username: , body:}"
        );
      });
  });
  test("404 response returns a path not found error when given a review that doesn't exist'", () => {
    const objComment = { username: "bainesface", body: "What a great game" };
    return request(app)
      .post("/api/reviews/666/comments")
      .send(objComment)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Route not found");
      });
  });
  test("404 response when given a username that doesn't exist in the database", () => {
    const objComment = {
      username: "Unknown",
      body: "random comment",
    };
    return request(app)
      .post("/api/reviews/3/comments")
      .send(objComment)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Route not found");
      });
  });
});
describe("#11 GET /api/reviews (queries)", () => {
  test("200 response returns reviews using defaults", () => {
    return request(app)
      .get(`/api/reviews`)
      .expect(200)
      .then(({ body: { reviews } }) => {
        expect(reviews).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("200 response will return reviews in order of the given query", () => {
    return request(app)
      .get(`/api/reviews?sort_by=votes`)
      .expect(200)
      .then(({ body: { reviews } }) => {
        expect(reviews).toBeSortedBy("votes", {
          descending: true,
          coerce: true,
        });
      });
  });
  test("200 response will return reviews in order of the given query with a given category", () => {
    return request(app)
      .get(`/api/reviews?sort_by=votes&category=dexterity`)
      .expect(200)
      .then(({ body: { reviews } }) => {
        reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              category: "dexterity",
            })
          );
        });
        expect(reviews).toBeSortedBy("votes", {
          descending: true,
          coerce: true,
        });
      });
  });
  test("400 response returns an error when an invalid sort_by is given", () => {
    return request(app)
      .get(`/api/reviews?sort_by=northcoders`)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Sort by query invalid");
      });
  });
  test("400 response returns an error invalid order query is given", () => {
    return request(app)
      .get(`/api/reviews?sort_by=votes&order=down`)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Order by query invalid");
      });
  });
  test("404 response returns an error when passed an invalid category", () => {
    return request(app)
      .get(`/api/reviews?category=aaaaaaaa`)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Page not found");
      });
  });
});
describe("#12 DELETE /api/comments/:comment_id", () => {
  test("204 response returns an empty object", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  test("404 response when given an id that does not exist", () => {
    return request(app)
      .delete("/api/comments/666")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Page not found");
      });
  });

  test("400 response when given an invalid comment id", () => {
    return request(app)
      .delete("/api/comments/barry")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Error! Invalid ID, bad request");
      });
  });
});
