const { validationResult } = require("express-validator");
const userService = require("../services/userService");

const getAddFile = async (req, res) => {
  const folders = await userService.getFolders();
  res.render("add-file", { errors: [], folders: folders });
};

// Add file to Supbase bucket & upload details to database
const addFile = async (req, res) => {
  // Extract file data from form & req object
  const buffer = req.file.buffer;
  const fileName = req.file.originalname;
  const fileType = req.file.mimetype;
  const fileSize = req.file.size;
  const userID = req.user.id;
  const folderID = parseInt(req.body.parentFolder);

  // Upload to Supabase
  const { data: uploadFile, error: uploadError } =
    await userService.uploadToSupabase(buffer, fileName, userID);

  console.log("THE UPLOAD FILE DATA IS", uploadFile.path);

  const { data: urlData, error: urlError } = await userService.getPublicURL(
    uploadFile.path,
  );

  console.log("THE URL DATA IS", urlData);

  // Update DB
  await userService.addFileToDatabase(
    fileName,
    folderID,
    userID,
    fileType,
    fileSize,
    urlData.publicUrl,
  );
  res.render("home", { errors: [] });
};

module.exports = { getAddFile, addFile };
