'use strict';

// Check if sent data is OK

const validationLogin = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res.status(422).send({ 'Unprocessable Entity': 'Unable to process the received data' });
  } else {
    next();
  }
};

const validationId = (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    res.status(422).send({ 'Unprocessable Entity': 'Unable to process the received data' });
  } else {
    next();
  }
};

const validationName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    res.status(422).send({ 'Unprocessable Entity': 'Unable to process the received data' });
  } else {
    next();
  }
};

const validationPolicyId = (req, res, next) => {
  const { policyId } = req.body;

  if (!policyId) {
    res.status(422).send({ 'Unprocessable Entity': 'Unable to process the received data' });
  } else {
    next();
  }
};

module.exports = {
  validationLogin,
  validationId,
  validationName,
  validationPolicyId
};
