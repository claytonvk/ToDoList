const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 3001;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "./views/index.html"));
});

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
