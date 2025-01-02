const prisma = require("./db");

// Load the .env variables from the file into the process.env object
require("dotenv").config();

async function main() {
  await prisma.user.create({
    data: {
      email: process.ADMIN_EMAIL,
      password: process.ADMIN_PASSDWORD,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      email: process.ADMIN_EMAIL,
    },
  });

  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
