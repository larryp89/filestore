const prisma = require("../db/db");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

async function addUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("sign-up", { errors: errors.array() });
    }

    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    console.log("User added to database");
    res.render("home");
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("An error occurred while adding the user.");
  }
}

module.exports = { addUser };
