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
      parent_ID: parentID,
    },
  });
}

async function addFile(fileName, folderID) {
  if (!folderID) {
    return await prisma.file.create({
      data: { file_name: fileName },
    });
  } else {
    return await prisma.file.create({
      data: {
        file_name: fileName,
        folder_ID: folderID,
      },
    });
  }
}

async function getFolders(userID) {
  return await prisma.folder.findMany({
    where: {
      user_ID: userID,
    },
  });
}

module.exports = {
  createUser,
  createFolder,
  addFile,
  getFolders,
};
