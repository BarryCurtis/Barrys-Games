INSERT INTO comments (body, review_id, author) VALUES ($1, $2, $3)RETURNING *,
[body, 3, author]