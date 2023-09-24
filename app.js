const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/draganddrop")
  .then(() => {
    console.log("CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("OH NO ERROR", err);
  });

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
