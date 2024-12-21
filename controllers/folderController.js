const { validationResult } = require("express-validator");
const userService = require("../services/userService");
const { user } = require("../prisma/client");

const getCreateFolder = async (req, res) => {
  const folders = await userService.getFolders(req.user.id);
  res.render("create-folder", { errors: [], folders: folders });
};

const createFolder = async (req, res) => {
  const folderName = req.body.folderName;
  const userID = req.user.id;
  const parentID = parseInt(req.body.parentFolder);

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const folders = await userService.getFolders(req.user.id);
      return res.render("create-folder", {
        errors: errors.array(),
        folders: folders,
      });
    }
    await userService.createFolder(folderName, userID, parentID);
    return res.render("home", { errors: [] });
  } catch (error) {
    console.log("Error creating folder:", error);
  }
};

const getSubfolders = async (req, res) => {
  const folderID = parseInt(req.params.subfolder);
  const userID = req.user.id;
  const subfolders = await userService.getSubfolders(userID, folderID);
  const files = await userService.getFolderFiles(userID, folderID);
  return res.render("documents", { folders: subfolders, files: files });
};

module.exports = { getCreateFolder, createFolder, getSubfolders };
