// config.js
require('dotenv').config();  // Load environment variables from .env file

module.exports = {
  mongoURI: process.env.MONGO_URI,  // MongoDB URI
  jwtSecret: process.env.JWT_SECRET, // JWT secret key
};
