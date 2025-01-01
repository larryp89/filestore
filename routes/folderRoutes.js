const { Router } = require("express");
const folderRoutes = Router();
const folderController = require("../controllers/folderController.js");
const { validateFolderName } = require("../validators/validate.js");
const isAuth = require("../middleware/isAuth.js");

folderRoutes.get("/create-folder", isAuth, folderController.getCreateFolder);
folderRoutes.post(
  "/create-folder",
  validateFolderName,
  folderController.createFolder,
);
folderRoutes.get("/folder/:subfolder", isAuth, folderController.getSubfolders);
folderRoutes.post("/delete-folder", folderController.deleteFolder);
module.exports = folderRoutes;
