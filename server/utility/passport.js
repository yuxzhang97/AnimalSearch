const passport = require("passport");
const {Strategy} = require('passport-google-token');
require("dotenv").config();

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you can validate the access token and fetch user data from Google APIs
      // For simplicity, we'll just return the profile data
      done(null, profile);
    }
  )
);

const authenticateGoogle = (req, res) =>
  new Promise((resolve, reject) => {
    //console.log(req);
    passport.authenticate("google-token", { session: false }, (err, data, info) => {     
      if (err) reject(err);
      resolve({ data, info });
    })(req, res);
  });

module.exports = { authenticateGoogle };
