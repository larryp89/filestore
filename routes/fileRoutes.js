const { Router } = require("express");
const upload = require("../config/multer");
const fileRoutes = Router();
const fileController = require("../controllers/fileController.js");
const isAuth = require("../middleware/isAuth.js");
fileRoutes.get("/add-file", isAuth, fileController.getAddFile);
fileRoutes.post("/add-file", upload.single("file"), fileController.addFile);
fileRoutes.post("/delete-file", fileController.deleteFile);
fileRoutes.get("/open/:fileID", isAuth, fileController.getFileDetails);

module.exports = fileRoutes;
