// File for prisma queries
const prisma = require("../db/db");

async function addUser(email, password) {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    console.log("User Added to database!");
    return newUser;
  } catch (err) {
    console.log("Error adding user to database:", err);
  }
}

async function createFolder(folderName, userID) {
  try {
    const newFolder = await prisma.folder.create({
      data: {
        folder_name: folderName,
        userID: userID,
      },
    });
    console.log("Successfully added folder");
    return newFolder;
  } catch (err) {
    console.log("Error creating folder:", err);
  }
}

module.exports = { addUser, createFolder };
