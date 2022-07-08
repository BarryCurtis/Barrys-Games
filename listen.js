const app = require("./app");

const PORT = process.env.PORT || 5432;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
});
