const { Router } = require("express");
const upload = require("../config/multer");
const fileRoutes = Router();
const fileController = require("../controllers/fileController.js");
const { validateFolderName } = require("../validators/validate.js");

fileRoutes.get("/add-file", fileController.getAddFile);
fileRoutes.post("/add-file", upload.single("file"), fileController.addFile);
fileRoutes.post("/delete-file", fileController.deleteFile);
fileRoutes.get("/open/:fileID", fileController.getFileDetails);

module.exports = fileRoutes;
