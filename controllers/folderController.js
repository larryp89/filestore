const { validationResult } = require("express-validator");
const userService = require("../services/userService");

const getCreateFolder = async (req, res) => {
  const folders = await userService.getFolders(req.user.id);
  console.log(folders);
  res.render("create-folder", { errors: [], folders: folders });
};

const createFolder = async (req, res) => {
  const folderName = req.body.folderName;
  const userID = req.user.id;
  const parentID = parseInt(req.body.parentFolder);

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("create-folder", { errors: errors.array() });
    }
    await userService.createFolder(folderName, userID, parentID);
    return res.render("home", { errors: [] });
  } catch (error) {
    console.log("Error creating folder:", error);
  }
};

module.exports = { getCreateFolder, createFolder };
