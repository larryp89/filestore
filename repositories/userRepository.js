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

async function createFolder(folderName, userID) {
  return await prisma.folder.create({
    data: {
      folder_name: folderName,
      user_ID: userID,
    },
  });
}

module.exports = {
  createUser,
  createFolder,
};
