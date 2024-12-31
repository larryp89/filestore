const { validationResult } = require("express-validator");
const userService = require("../services/userService");

const getAddFile = async (req, res) => {
  const userID = req.user.id;
  const folders = await userService.getFolders(userID);
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
  try {
    const { data: uploadFile, error: uploadError } =
      await userService.uploadToSupabase(buffer, fileName, userID);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return res.render("add-file", {
        errors: [{ msg: uploadError.message }],
        folders: [],
      });
    }
    console.log("Upload file:", uploadFile);
    const { data: urlData, error: urlError } = await userService.getPublicURL(
      uploadFile.path,
    );
    if (urlError) {
      console.error("URL error:", urlError);
      return res.render("add-file", {
        errors: [{ msg: "Failed to get file URL" }],
        folders: [],
      });
    }
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
  } catch {
    console.log("URL Error");
  }
};

const deleteFile = async (req, res) => {
  const fileName = req.body.fileName;
  console.log("The file is called", fileName);
  const fileID = parseInt(req.body.fileID);
  const userID = parseInt(req.user.id);
  await userService.deleteFile(fileID, userID, fileName);
  res.redirect("/documents");
};

module.exports = { getAddFile, addFile, deleteFile };
