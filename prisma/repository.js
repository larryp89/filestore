// File for prisma queries
const prisma = require("../db/db");

async function addUser(email, password) {
  try {
    await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });
    console.log("User Added to database!");
  } catch (err) {
    console.log("Error adding user to database:", err);
  }
}

module.exports = { addUser };
