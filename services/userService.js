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

async function deleteFile(fileID) {
  return await userRepository.deleteFile(fileID);
}

async function getFolders(userID) {
  return await userRepository.getFolders(userID);
}

async function getSubfolders(userID, folderID) {
  return await userRepository.getSubfolders(userID, folderID);
}

async function getRootFolders(userID) {
  return await userRepository.getRootFolders(userID);
}

async function getRootFiles(userID) {
  return await userRepository.getRootFiles(userID);
}

async function getFolderFiles(userID, folderID) {
  return await userRepository.getFolderFiles(userID, folderID);
}

async function uploadToSupabase(file, filename, userID) {
  return supabase.storage
    .from("All Files")
    .upload(`/${userID}/${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
}

async function deleteFile(fileID, userID, fileName) {
  await userRepository.deleteFile(fileID, userID);
  return deleteFromSupabase(fileName, userID);
}
async function deleteFromSupabase(filename, userID) {
  const { data, error } = await supabase.storage
    .from("All Files")
    .remove([`${userID}/${filename}`]);
  return data;
}

async function getPublicURL(path) {
  return supabase.storage.from(supabaseBucket).getPublicUrl(path);
}

module.exports = {
  createUser,
  createFolder,
  addFileToDatabase,
  getFolders,
  getSubfolders,
  getFolderFiles,
  uploadToSupabase,
  getPublicURL,
  getRootFolders,
  getRootFiles,
  deleteFile,
};
