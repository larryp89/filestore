const { PrismaClient } = require("@prisma/client");

require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
process.env.DATABASE_URL = isProduction
  ? process.env.PROD_DATABASE_URL
  : process.env.LOCAL_DATABASE_URL;

const prisma = new PrismaClient();
module.exports = prisma;
