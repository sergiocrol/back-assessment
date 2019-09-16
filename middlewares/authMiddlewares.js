'use strict';

const jwt = require('jsonwebtoken');

// Verify if the user is logged in
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['x-access-token'] || req.headers.authorization || req.cookies.auth;

  // Check if token has been sent
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader.split(' ')[1];
    jwt.verify(req.token, process.env.JWT_MY_SECRET, async (error) => {
      if (error) {
        res.status(401).send({ success: false, unauthorized: 'You have to login to access to this info' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ success: false, unauthorized: 'You have to login to access to this info' });
  }
};

// Verify if the user's role is admin
const isAdmin = (req, res, next) => {
  const bearerHeader = req.headers['x-access-token'] || req.headers.authorization || req.cookies.auth;
  req.token = bearerHeader.split(' ')[1];
  jwt.verify(req.token, process.env.JWT_MY_SECRET, async (error, decoded) => {
    if (error) {
      res.status(401).send({ success: false, unauthorized: 'You have to login to access to this info' });
    } else {
      decoded.user.role === 'admin' ? next() : res.status(403).send({ success: false, forbidden: 'This info can only be accessed by an admin' });
    }
  });
};

// Check if the user is logged in. In that case, cannot login again
const isNotLoggedIn = (req, res, next) => {
  const bearerHeader = req.headers['x-access-token'] || req.headers.authorization || req.cookies.auth;

  if (typeof bearerHeader === 'undefined') {
    next();
  } else {
    req.token = bearerHeader.split(' ')[1];
    jwt.verify(req.token, process.env.JWT_MY_SECRET, async (error) => {
      if (error) {
        next();
      } else {
        res.status(401).send({ success: false, unauthorized: 'You are already logged in' });
      }
    });
  }
};

module.exports = {
  isNotLoggedIn,
  verifyToken,
  isAdmin
};
