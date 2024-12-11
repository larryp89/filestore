const session = require("express-session"); // Stores information about a user's interaction across different pages of a website via a unique id
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("../db/db");

const sessionMiddleware = session({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
  },
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});

module.exports = sessionMiddleware;
