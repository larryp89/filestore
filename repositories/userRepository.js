const prisma = require("../prisma/client");

async function createUser({ email, password }) {
  return await prisma.user.create({
    data: {
      email,
      password,
    },
  });
}

module.exports = {
  createUser,
};
