// Created File #2

// server.js: all the code to get things up and running here

const http = require("http");

// models from sequelize section
const { db, Page, User } = require("./models");

const app = require("./app");
const server = http.createServer(app);

const PORT = 3000;

const init = async () => {
  await Page.sync(); // {force: true} --> if you want to re-write databases; needed for associations!
  await User.sync();
  await db.sync(); // may not need this code

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

init();
