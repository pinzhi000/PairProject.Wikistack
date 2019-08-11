// Create 4a

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

// retrieves web page
// localhost:3000/wiki/

router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages)); // main.js in views folder
  } catch (error) {
    next(error);
  }
});

// wiki
// adds to database 'pages' table
// after submit form, goes here to POST given addPage.js file code
// alternative code from learnDot: https://learn.fullstackacademy.com/workshop/5a68bdb4d749e900042aa7ee/content/5a68bdb4d749e900042aa80a/text

router.post("/", async (req, res, next) => {
  // const page = new Page(req.body); // shortcut to do below

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise

  try {
    // post User table info from form
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });

    await page.save(); // wait for data to be saved

    page.setAuthor(user); // database association between pages and users tables --> code in models files

    res.redirect(`/wiki/${page.slug}`); // after clicking submit button, redirects to slug page
  } catch (error) {
    next(error);
  }
});

// retrieves web page (i.e. form in this case)
// wiki/add
router.get("/add", (req, res, next) => {
  res.send(addPage()); // addPage() is a function that represents HTML template
});

// create new web page based on user input title from form
// slug is cleaned up title field in db
// /wiki/:slug

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    const author = await page.getAuthor();

    res.send(wikiPage(page, author)); // note: mac to linux filename syntax change
  } catch (error) {
    next(error);
  }
});

module.exports = router;
