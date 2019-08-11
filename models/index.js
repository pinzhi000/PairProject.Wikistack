// Created File #3

// The first thing we need to do with Sequelize is require it and connect to the currently-running database process
// can call this file sequelize.js instead
// sync creates the tables in the database: takes schema definition and synchornizes with database

const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack2", {
  logging: false // does not log SQL code to terminal
});

// verify connection to postgres database is working
db.authenticate().then(() => {
  console.log("connected to the database, yay!");
});

// Page is schema definition --> object
// use db.define on page table
const Page = db.define("page", {
  // postgresql: table is pages
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "closed")
  }
});

// use slug to make title url-friendly for routing purposes

function generateSlug(title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
}

// hooks: adjusting the models
// page defined in wiki.js file (single instance of filled out form)

Page.beforeValidate(page => {
  if (!page.slug) {
    page.slug = generateSlug(page.title);
  }
});

const User = db.define("user", {
  // postgresql: table is users
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

// This adds methods to 'Page', such as '.setAuthor'
// Creates a foreign key attribute on the Page table pointing ot the User table
Page.belongsTo(User, { as: "author" });
//User.hasMany(Page, { foreignKey: "authorId" });

// export
// Page and User are kind of like classes that we can use to create new Page or User objects that know how to get back and forth to database
module.exports = {
  db,
  Page,
  User
};
