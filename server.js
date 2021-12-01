const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log(`${new Date()} - ${req.method} - ${req.url}`);
  next();
});

app.use(express.static("../static/"));

app.listen(3000, (err, res) => {
  console.log(`listening on port 3000`);
});
