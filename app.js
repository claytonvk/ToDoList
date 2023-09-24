const express = require("express");
const path = require("path");

const app = express();

const hostname = "127.0.0.1";
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "./views/index.html"));
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
