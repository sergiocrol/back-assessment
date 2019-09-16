'use strict';

const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/authMiddlewares');
const APIhelper = require('../helpers/APIhelper');

router.get('/login', isLoggedIn, async (req, res, next) => {
  const result = await APIhelper.getUsers();
  // const policyResult = await APIhelper.getPolicies('e8fd159b-57c4-4d36-9bd7-a59ca13057bb');
  res.render('login');
});

router.post('/login', isLoggedIn);

module.exports = router;
