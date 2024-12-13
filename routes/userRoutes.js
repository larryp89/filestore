const { Router } = require("express");
const userRoutes = Router();
const { validateSignUp } = require("../validators/validate");
const passport = require("../config/passport");
const userController = require("../controllers/userController");

userRoutes.get("/sign-up", userController.getSignup);
userRoutes.post("/sign-up", validateSignUp, userController.postSignup);
userRoutes.get("/login", userController.getLogin);
// userRoutes.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
// );

module.exports = userRoutes;
