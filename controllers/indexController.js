// Handles generic pages
const passport = require("../config/passport");

const home = async (req, res) => {
  res.render("home", { errors: [] });
};

const about = async (req, res) => {
  res.render("about");
};

module.exports = { home, about };
