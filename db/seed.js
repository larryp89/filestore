const prisma = require("./db");

async function main() {
  await prisma.user.create({
    data: {
      email: "admin@mail.com",
      password: "helloworld",
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      email: "admin@mail.com",
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
