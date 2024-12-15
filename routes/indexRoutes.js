const { Router } = require("express");
const indexRoutes = Router();
const indexController = require("../controllers/indexController");

indexRoutes.get("/", indexController.home);
indexRoutes.get("/about", indexController.about);

module.exports = indexRoutes;