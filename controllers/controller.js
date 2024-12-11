const { validationResult } = require("express-validator");
const userService = require("../services/userService");

const createUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("sign-up", { errors: errors.array() });
    }
    const newUser = await userService.createUser(email, password);
    return res.render("home");
  } catch (error) {
    console.log("Failed to create user", error);
  }
};

module.exports = {
  createUser,
};

module.exports = { createUser };
