const express = require('express');

const prospectRoute = require('./prospects');

const router = express.Router();

module.exports = (storage) => {
  router.get('/', (req, res) => {
    res.sendStatus(200);
  });

  router.use('/prospects', prospectRoute(storage));

  return router;
};
