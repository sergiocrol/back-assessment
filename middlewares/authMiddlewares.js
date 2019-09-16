'use strict';

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

// Verify if the user is logged in
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  // Check if token has been sent
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader.split(' ')[1];
    next();
  } else {
    res.status(401).send({ success: false, unauthorized: 'You have to login to access to this info' });
  }
};

// Verify if the user's role is admin
const isAdmin = (req, res, next) => {
  req.token === 'admin' ? next() : res.status(403).send({ success: false, forbidden: 'This info can only be accessed by an admin' });
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  next();
};

const validationLoggin = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res.status(422).json({ '422 - Unprocessable Entity': 'Unable to process the received data' });
  } else {
    next();
  }
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  verifyToken,
  validationLoggin,
  isAdmin
};
