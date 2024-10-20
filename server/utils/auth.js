// utils/auth.js

const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Ensure these environment variables are set in your .env file
const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

if (!secret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

if (!expiration) {
  throw new Error('JWT_EXPIRATION is not defined in environment variables');
}

module.exports = {
  AuthenticationError, // Export Apollo's AuthenticationError for use in resolvers

  authMiddleware: function ({ req }) {
    // Extract token from headers, body, or query parameters
    let token = req.body.token || req.query.token || req.headers.authorization;
  
    // If the token is in the Authorization header, extract the actual token
    if (req.headers.authorization) {
      // Expected format: "Bearer <token>"
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      } else {
        console.warn('Authorization header format is invalid');
        token = null;
      }
    }
  
    // If no token is found, proceed without attaching user information
    if (!token) {
      return req;
    }
  
    try {
      // Verify the token using the secret and expiration settings
      const decoded = jwt.verify(token, secret, { maxAge: expiration });
      req.user = decoded.data; // Attach user data to the request object
    } catch (err) {
      console.log('Invalid token:', err.message);
      // Optionally, you can throw an AuthenticationError here
      // throw new AuthenticationError('Invalid/Expired token');
      // For middleware, it's better to just log and proceed
    }
  
    return req;
  },

  signToken: function ({ email, username, _id, isUpgraded }) {
    // Create a payload with user information
    const payload = { email, username, _id, isUpgraded };
    // Sign the token with the payload, secret, and expiration
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
