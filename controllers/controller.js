// The controller extracts data from the request and calls the service method:

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

const createFolder = async (req, res) => {
  const folderName = req.body.folderName;
  const userID = req.user.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("create-folder", { errors: errors.array() });
    }
    await userService.createFolder(folderName, userID);
    return res.render("create-folder", { errors: [] });
  } catch (error) {
    console.log("Error creating folder:", error);
  }
};

module.exports = {
  createUser,
  createFolder,
};
