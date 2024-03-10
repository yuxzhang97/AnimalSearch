require("dotenv").config();
const jwt = require('jsonwebtoken');


// Secret key for signing tokens
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// Function to generate an access token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, accessTokenSecret, { expiresIn: '15m' });
};

// Function to generate a refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, refreshTokenSecret);
};

module.exports = { generateAccessToken, generateRefreshToken };
