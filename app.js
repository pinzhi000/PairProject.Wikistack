// Created File #1

// import all here

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

// creates an express app
const app = express();

// middleware logging
app.use(morgan("dev"));

// middleware to access static files
app.use(express.static(path.join(__dirname, "./public")));

// middleware to setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// refer to layout.js in views folder
const layout = require("./views/layout");

// setup routes
app.get("/", (req, res) => {
  res.redirect("/wiki"); // redirects to /wiki app.use() router below
});

// routers --> links to wiki.js and user.js files
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");

// routers
app.use("/wiki", wikiRouter);
app.use("/users", userRouter);

module.exports = app;
