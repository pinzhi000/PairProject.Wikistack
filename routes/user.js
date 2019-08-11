// Create 4b

const express = require("express");
const router = express.Router();

// use views with HTML
const {
  addPage,
  editPage,
  main,
  userList,
  userPages,
  wikiPage
} = require("../views/index");

// data table object from models
const { Page, User } = require("../models");

// /localhost:3000/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users)); //userList.js HTML file from views
  } catch (error) {
    next(error);
  }
});

// /users/:id
router.get("/:userId", async (req, res, next) => {
  try {
    const eachUser = await User.findByPk(req.params.userId); // findById() is not a function
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });

    //const pages = await eachUser.getPages(); // database association between pages and users tables --> code in models files

    res.send(userPages(eachUser, pages)); //userPages.js HTML file from views
  } catch (error) {
    next(error);
  }
});

module.exports = router;
