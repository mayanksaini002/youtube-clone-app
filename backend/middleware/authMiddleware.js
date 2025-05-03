const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

module.exports = (req, res, next) => {
  // Get token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Remove 'Bearer ' prefix

  // If token is not found
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, jwtSecret);
    
    // Attach the decoded user info to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid, respond with error message
    res.status(400).json({ message: 'Invalid token' });
  }
};
