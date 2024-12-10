const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../db/db");
const bcrypt = require("bcryptjs");

// Configure LocalStrategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Since using email for login can't use default username/password
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Find user in database
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email],
        );
        const user = rows[0];

        // User not found
        if (!user) {
          return done(null, false, {
            message: "No user found with this email",
          });
        }

        // Check password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }

        // Success
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// How we store user in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// How we get user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query(
      // Determines what is accessible from the DB on the user
      "SELECT id, email, first_name, last_name, is_member, is_admin FROM users WHERE id = $1",
      [id],
    );
    const user = rows[0];

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
