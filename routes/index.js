'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const APIhelper = require('../helpers/APIhelper');

const { isNotLoggedIn, verifyToken, validationLoggin, isAdmin } = require('../middlewares/authMiddlewares');

router.get('/', /* isNotLoggedIn, */(req, res, next) => {
  res.json({
    message: 'Welcome to INSURAN.CE API :)'
  });
});

router.get('/users/id', verifyToken, (req, res) => {
  // Check if there is an existing token and get user data by username passed in the body
  const { id } = req.body;
  jwt.verify(req.token, process.env.JWT_MY_SECRET, async (error) => {
    if (error) {
      res.status(401).send({ success: false, unauthorized: 'You have to login to access to this info' });
    } else {
      let user = await APIhelper.getUsers();
      user = user.filter(us => us.id === id);
      res.json({
        user
      });
    }
  });
});

router.get('/users/name', verifyToken, (req, res) => {
  // Check if there is an existing token and get user data by id passed in the body
  const { name } = req.body;
  jwt.verify(req.token, process.env.JWT_MY_SECRET, async (error) => {
    if (error) {
      res.status(401).send({ success: false, unauthorized: 'You have to login to access to this info' });
    } else {
      let user = await APIhelper.getUsers();
      user = user.filter(user => user.name === name);
      res.json({
        user
      });
    }
  });
});

router.get('/policies', verifyToken, isAdmin, (req, res) => {

});

router.post('/login', /* isNotLoggedIn, validationLoggin, */(req, res, next) => {
  // check if the email is in the data received from external API. If it is, save token in the local storage
  const { email } = req.body;

  jwt.sign({ email }, process.env.JWT_MY_SECRET, (err, token) => {
    res.json({ token });
  });
});

module.exports = router;
