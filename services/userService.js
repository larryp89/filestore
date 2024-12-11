// The service prepares the data object (e.g., by hashing the password) and then calls the repository method

const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await userRepository.createUser({ email, password: hashedPassword });
}

module.exports = {
  createUser,
};
