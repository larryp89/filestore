// Queries the database via Prisma

const prisma = require("../prisma/client");

async function createUser(email, password) {
  return await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });
}

async function createFolder(folderName, userID, parentID) {
  return await prisma.folder.create({
    data: {
      folder_name: folderName,
      user_ID: userID,
      parent_ID: parentID || null,
    },
  });
}

async function getFolders(userID) {
  return await prisma.folder.findMany({
    where: {
      user_ID: userID,
    },
  });
}

async function getSubfolders(userID, folderID) {
  return await prisma.folder.findMany({
    where: {
      user_ID: userID,
      parent_ID: folderID,
    },
  });
}

async function getRootFolders(userID) {
  return await prisma.folder.findMany({
    where: {
      user_ID: userID,
      parent_ID: null,
    },
  });
}

async function getRootFiles(userID) {
  return prisma.file.findMany({
    where: {
      user_ID: userID,
      folder_ID: null,
    },
  });
}

async function addFile(
  fileName,
  folderID,
  userID,
  fileType,
  fileSize,
  fileURL,
) {
  return await prisma.file.create({
    data: {
      file_name: fileName,
      folder_ID: folderID || null,
      user_ID: userID,
      file_type: fileType,
      file_size: fileSize,
      file_URL: fileURL,
    },
  });
}

async function deleteFile(fileID) {
  return await prisma.file.delete({
    where: {
      id: fileID,
    },
  });
}

async function getFolderFiles(userID, folderID) {
  return await prisma.file.findMany({
    where: {
      folder_ID: folderID,
      user_ID: userID,
    },
  });
}

module.exports = {
  createUser,
  createFolder,
  addFile,
  getFolders,
  getRootFolders,
  getRootFiles,
  getSubfolders,
  getFolderFiles,
  deleteFile,
};
