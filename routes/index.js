'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const APIhelper = require('../helpers/APIhelper');

const { isNotLoggedIn, verifyToken, validationLogin, isAdmin } = require('../middlewares/authMiddlewares');

router.get('/', (req, res, next) => {
  res.json({
    'Get users by ID': 'http://localhost:3000/api/users/id',
    'Get users by name': 'http://localhost:3000/api/users/name',
    'Get user linked to policy': 'http://localhost:3000/api/users/policy',
    'Get policies of user': 'http://localhost:3000/api/policies'
  });
});

router.get('/users/id', verifyToken, async (req, res) => {
  // Check if there is an existing token and get the user's data by the username passed in the body
  const { id } = req.body;

  let user = await APIhelper.getUsers();
  user = user.filter(us => us.id === id);
  res.json({
    user
  });
});

router.get('/users/name', verifyToken, async (req, res) => {
  // Check if there is an existing token and get user data by id passed in the body
  const { name } = req.body;

  let user = await APIhelper.getUsers();
  user = user.filter(user => user.name === name);
  res.json({
    user
  });
});

router.get('/policies', verifyToken, isAdmin, (req, res) => {

});

router.post('/login', /* isNotLoggedIn, */ validationLogin, async (req, res, next) => {
  // check if the email is in the data received from external API. If it is, save token in the local storage
  const { email } = req.body;

  let user = await APIhelper.getUsers();
  user = user.filter(user => user.email === email);

  if (user.length !== 0) {
    const token = jwt.sign({ email }, process.env.JWT_MY_SECRET, { expiresIn: '24h' });

    res.status(200).send({
      success: true,
      message: 'Authentication successful!',
      token
    });
  } else {
    res.status(400).send({
      success: false,
      message: 'Authentication failed! This email is not in the database'
    });
  }
});

module.exports = router;
