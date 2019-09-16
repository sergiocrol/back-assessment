'use strict';

const express = require('express');
const router = express.Router();

const { isNotLoggedIn } = require('../middlewares/authMiddlewares');

router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
