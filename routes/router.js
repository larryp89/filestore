// Imports & destructures the Router function
const { Router } = require("express");
const router = Router();
const passport = require("passport");

// Routes
router.get("/", (req, res) => res.render("home"));

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   })
// );

// router.post("/logout", (req, res, next) => {
//   // Passport adds a logout property to the req object
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

module.exports = router;
