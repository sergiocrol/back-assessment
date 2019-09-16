'use strict';

const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

// Verify if the user is logged in
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['x-access-token'] || req.headers.authorization;

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
  const bearerHeader = req.headers['x-access-token'] || req.headers.authorization;
  req.token = bearerHeader.split(' ')[1];
  jwt.verify(req.token, process.env.JWT_MY_SECRET, async (error, decoded) => {
    if (error) {
      res.status(401).send({ success: false, unauthorized: 'You have to login to access to this info' });
    } else {
      decoded.user.role === 'admin' ? next() : res.status(403).send({ success: false, forbidden: 'This info can only be accessed by an admin' });
    }
  });
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  next();
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  verifyToken,
  isAdmin
};
