const { Router } = require("express");
const userRoutes = Router();
const { validateSignUp } = require("../validators/validate");
const userController = require("../controllers/userController");
const isAuth = require("../middleware/isAuth.js");

userRoutes.get("/sign-up", userController.getSignup);
userRoutes.post("/sign-up", validateSignUp, userController.signup);
userRoutes.get("/login", userController.getLogin);
userRoutes.post("/login", userController.login);
userRoutes.post("/logout", userController.logout);
userRoutes.get("/documents", isAuth, userController.getDocuments);

module.exports = userRoutes;
