'use strict';

const express = require('express');
const path = require('path');
require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

// ERRORS
app.use((req, res, next) => {
  res.status(404).send({ message: 'not found' });
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);

  // render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || '500';
    res.status(statusError).json(err);
  }
});

module.exports = app;
