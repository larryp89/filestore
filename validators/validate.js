const { body } = require("express-validator");

const validateSignUp = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Must be a valid email address"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Must be minimum 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Must contain an uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Must contain a lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Must contain a digit")
    .matches(/[@$!%*?&#]/)
    .withMessage("Must contain a special character, i.e. @$!%*?&#"),

  body("repeatPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

const validateFolderName = [
  body("folderName")
    .trim()
    .notEmpty()
    .withMessage("Folder name cannot be empty")
    .isAlphanumeric()
    .withMessage("Name can only contain alphanumeric characters"),
];

module.exports = { validateSignUp, validateFolderName };
