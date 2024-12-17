// The service prepares the data object (e.g., by hashing the password) and then calls the repository method

const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const supabase = require("../config/supabase");
const supabaseBucket = "All Files";

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser(email, hashedPassword);
}

async function createFolder(folderName, userID, parentID) {
  return await userRepository.createFolder(folderName, userID, parentID);
}

async function addFileToDatabase(
  filename,
  folderID,
  userID,
  fileType,
  fileSize,
  fileURL,
) {
  return await userRepository.addFile(
    filename,
    folderID,
    userID,
    fileType,
    fileSize,
    fileURL,
  );
}

async function getFolders(userID) {
  return await userRepository.getFolders(userID);
}

async function getRootFolders(userID) {
  return await userRepository.getRootFolders(userID);
}

async function getRootFiles(userID) {
  return await userRepository.getRootFiles(userID);
}

async function uploadToSupabase(file, filename, userID) {
  return supabase.storage
    .from("All Files")
    .upload(`/${userID}/${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
}

async function getPublicURL(path) {
  return await supabase.storage.from(supabaseBucket).getPublicUrl(path);
}

module.exports = {
  createUser,
  createFolder,
  addFileToDatabase,
  getFolders,
  uploadToSupabase,
  getPublicURL,
  getRootFolders,
  getRootFiles,
};
