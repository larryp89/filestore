// The service prepares the data object (e.g., by hashing the password) and then calls the repository method

const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const supabase = require("../config/supabase");

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser(email, hashedPassword);
}

async function createFolder(folderName, userID) {
  return await userRepository.createFolder(folderName, userID);
}

async function addFile(filename, folderID) {
  return await userRepository.addFile(folderID, folderID);
}

async function getFolders(userID) {
  return await userRepository.showFolders(userID);
}

async function uploadToSupabase(file, filename, userID) {
  const { data, error } = await supabase.storage
    .from("All Files")
    .upload(`/${userID}/${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
  console.log(data);
  console.log(error);
}
module.exports = {
  createUser,
  createFolder,
  addFile,
  getFolders,
  uploadToSupabase,
};
