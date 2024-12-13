// // Imports & destructures the Router function
// const { Router } = require("express");
// const router = Router();
// const passport = require("../config/passport");
// const controller = require("../controllers/controller");
// const { validateFolderName } = require("../validators/validate");
// const upload = require("../config/multer");
// const isAuth = require("../middleware/isAuth");

// // Routes

// router.get("/add-file", isAuth, (req, res) =>
//   res.render("add-file", {
//     errors: [],
//   }),
// );
// router.get("/create-folder", isAuth, (req, res) =>
//   res.render("create-folder", { errors: [] }),
// );

// // Authenticated login/logout routes

// router.post("/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

// module.exports = router;

// // File upload
// router.post("/add-file", upload.single("file"), controller.uploadFile);

// // Create a folder
// router.post("/create-folder", validateFolderName, controller.createFolder);

// // Show all uploads
// router.get("/all-uploads", controller.displayFolders);
