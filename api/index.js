const express = require("express");
const app = express();
const path = require("node:path");
const flash = require("connect-flash");
const sessionMiddleware = require("../config/session.js");
const passport = require("../config/passport.js");
const errorHandler = require("../middleware/errorHandler.js");
const indexRoutes = require("../routes/indexRoutes.js");
const userRoutes = require("../routes/userRoutes.js");
const folderRoutes = require("../routes/folderRoutes.js");
const fileRoutes = require("../routes/fileRoutes.js");

// Configure the app to use EJS and specify the directory for EJS templates
app.set("views", path.join(__dirname, "../views")); // Tells Express to look for template files in the views directory.
app.set("view engine", "ejs"); // Sets EJS as the templating engine, allowing you to render EJS templates with the res.render method

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static fIiles from a public directory
const assetsPath = path.join(__dirname, "../public");
app.use(express.static(assetsPath));

// Set up session, which happens on every route request
app.use(sessionMiddleware);
app.use(passport.session());
app.use(flash());
app.use(errorHandler);

// Allows the currently authenticated user to be accessible in views as currentUser rather than passing in {} to each contoller/view
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.message = req.flash();
  next();
});

// Get routes from routers
app.use("/", indexRoutes);
app.use("/", userRoutes);
app.use("/", folderRoutes);
app.use("/", fileRoutes);

// NB process accessible on global object so don't need to require
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Filestore - listening on port ${PORT}!`);
});
