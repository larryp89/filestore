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
folderRoutes.get("/folder/:subfolder", folderController.getSubfolders);

module.exports = folderRoutes;
