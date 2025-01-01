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
  try {
    return await userRepository.createFolder(folderName, userID, parentID);
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("folder_name")) {
      throw new Error(
        "A folder with this name already exists. Please choose a different name.",
      );
    }
    throw error;
  }
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
  try {
    const { data, error } = await supabase.storage
      .from("All Files")
      .upload(`${userID}/${filename}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.error("Upload error:", error.message);
      return { data, error }; // data returned as null if an error
    }

    console.log("File uploaded successfully:", data);
    return { data, error }; // error returend as null if no error
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return { data: null, error: err };
  }
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

async function deleteFolderAndContents(folderID, userID) {
  // Find all subfolders
  const subfolders = await userRepository.getSubfolders(userID, folderID);

  // Recursively delete subfolders and their content
  for (const subfolder of subfolders) {
    await deleteFolderAndContents(subfolder.id, userID);
  }

  // If no more subfolders, will continue to here //

  // Find and delete all files in the subfolder
  const files = await userRepository.getFolderFiles(userID, folderID);
  for (const file of files) {
    await deleteFromSupabase(file.file_name, userID);
  }

  // Delete folder (files delete on cascade)
  await userRepository.deleteFolder(userID, folderID);
}

async function getFileDetails(userID, fileID) {
  return userRepository.getFileDetails(userID, fileID);
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
  deleteFolderAndContents,
  getFileDetails,
};
