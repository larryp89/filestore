// Imports & destructures the Router function
const { Router } = require("express");
const router = Router();
const passport = require("../config/passport");
const controller = require("../controllers/controller");
const {
  validateSignUp,
  validateFolderName,
} = require("../validators/validate");
const upload = require("../config/multer");
const isAuth = require("../middleware/isAuth");

// Routes
router.get("/", (req, res) => res.render("home", { errors: [] }));
router.get("/sign-up", (req, res) => res.render("sign-up", { errors: [] }));
router.post("/sign-up", validateSignUp, controller.createUser);
router.get("/add-file", isAuth, (req, res) =>
  res.render("add-file", {
    errors: [],
  }),
);
router.get("/create-folder", isAuth, (req, res) =>
  res.render("create-folder", { errors: [] }),
);

// Authenticated login/logout routes
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;

// File upload
router.post("/upload-files", upload.single("file"), (req, res, next) => {
  res.send("Upload success");
});

// Create a folder
router.post("/create-folder", validateFolderName, controller.createFolder);
