const { Router } = require("express");
const indexRoutes = Router();
const indexController = require("../controllers/indexController");

indexRoutes.get("/", indexController.home);

module.exports = indexRoutes;
