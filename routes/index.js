'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const APIhelper = require('../helpers/APIhelper');

const { isNotLoggedIn, verifyToken, isAdmin } = require('../middlewares/authMiddlewares');
const { validationLogin, validationId, validationName, validationPolicyId } = require('../middlewares/validationMiddlewares');

router.get('/', (req, res) => {
  res.json({
    'Get users by ID': 'http://localhost:3000/api/users/id',
    'Get users by name': 'http://localhost:3000/api/users/name',
    'Get user linked to policy': 'http://localhost:3000/api/users/policy',
    'Get policies of user': 'http://localhost:3000/api/policies/:username',
    'Log in': 'http://localhost:3000/api/login',
    'Log out': 'http://localhost:3000/api/logout'
  });
});

// Get user data by ID
router.get('/users/id', verifyToken, validationId, async (req, res) => {
  // Check if there is an existing token and get the user's data by the username passed in the body
  const { id } = req.body;

  const user = await getUserByParam('id', id);
  if (user.length !== 0) {
    res.status(200).send({
      user
    });
  } else {
    res.status(404).send({
      message: 'user not found'
    });
  }
});

// Get user data by name
router.get('/users/name', verifyToken, validationName, async (req, res) => {
  // Check if there is an existing token and get user data by id passed in the body
  const { name } = req.body;

  const user = await getUserByParam('name', name);
  if (user.length !== 0) {
    res.status(200).send({
      user
    });
  } else {
    res.status(404).send({
      message: 'user not found'
    });
  }
});

// Get the user data linked to policy
router.get('/users/policy', verifyToken, validationPolicyId, isAdmin, async (req, res) => {
  // Check if there is an existing token and if the logged in user is an admin
  const { policyId } = req.body;

  const policies = await APIhelper.getPolicy(policyId);
  if (policies.length !== 0) {
    const user = await getUserByParam('id', policies[0].clientId);
    res.status(200).send({
      user
    });
  } else {
    res.status(404).send({
      message: 'No policy found with this ID'
    });
  }
});

// Get all the policies linked to username
router.get('/policies/:name', verifyToken, isAdmin, async (req, res) => {
  // Check if there is an existing token and if the logged in user is an admin
  const { name } = req.params;

  const user = await getUserByParam('name', name);
  const policies = await APIhelper.getPolicies(user[0].id);
  if (policies.length !== 0) {
    res.status(200).send({
      policies
    });
  } else {
    res.status(404).send({
      message: 'Not policies found for this user'
    });
  }
});

// Login
router.post('/login', isNotLoggedIn, validationLogin, async (req, res) => {
  // check if the email is in the data received from external API. If it is, save token in the local storage
  const { email } = req.body;

  let user = await APIhelper.getUsers();
  user = user.filter(user => user.email === email);

  if (user.length !== 0) {
    const token = jwt.sign({ user: user[0] }, process.env.JWT_MY_SECRET, { expiresIn: '24h' });

    res.cookie('auth', token);
    res.status(200).send({
      success: true,
      message: 'Authentication successful!',
      token: token
    });
  } else {
    res.status(400).send({
      success: false,
      message: 'Authentication failed! This email is not in the database'
    });
  }
});

// Logout
router.post('/logout', verifyToken, (req, res) => {
  res.clearCookie('auth');
  res.status(200).send({
    success: true,
    message: 'User logged out'
  });
});

// Ger user data based on user id or name
const getUserByParam = async (type, param) => {
  const user = await APIhelper.getUsers();
  return user.filter(user => user[type] === param);
};

module.exports = router;
