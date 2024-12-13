const { Router } = require("express");
const folderRoutes = Router();
const folderController = require("../controllers/folderController.js");
const { validateFolderName } = require("../validators/validate.js");

folderRoutes.get("/create-folder", folderController.getCreateFolder);
folderRoutes.post(
  "/create-folder",
  validateFolderName,
  folderController.createFolder,
);

module.exports = folderRoutes;
