const connection = require("../db/connection");
const app = require("../app");
const seed = require("../db/seeds/seed");
const {
  categoryData,
  commentData,
  reviewData,
  userData,
} = require("../db/data/test-data/");
const request = require("supertest");

beforeEach(() => seed({ categoryData, commentData, reviewData, userData }));
afterAll(() => connection.end());

describe("GET /api/categories", () => {
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
  test("404 response returns an error path not found", () => {
    return request(app)
      .get("/api/categor")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request, path not found");
      });
  });
});
