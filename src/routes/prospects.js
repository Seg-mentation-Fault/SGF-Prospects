const express = require('express');
const { body, validationResult } = require('express-validator');

const {
  getAllProspects,
  getProspect,
} = require('../controllers/prospectController');
const { newProspect } = require('../service/newPorspect');
const { putProspect } = require('../service/updateProspect');
const { dropProspect } = require('../service/deleteProspect');

const router = express.Router();

const validation = [
  body('name')
    .optional()
    .isAlpha('es-ES', { ignore: ' ' })
    .trim()
    .escape()
    .withMessage('First name must be a vaild name string'),
  body('email')
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage('email should be a valid email'),
  // body('id').escape().isInt().withMessage('Id should be an integer'),
];

module.exports = (storage) => {
  router.get('/', async (req, res) => {
    try {
      if (req.query.id) {
        console.log(req.query.id);
        const { id } = req.query;
        const prospectObj = await getProspect(storage, { id });
        return res.json(prospectObj);
      }
      const prospectsList = await getAllProspects(storage);
      return res.json(prospectsList);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  });

  router.post('/', validation, async (req, res) => {
    try {
      const errors = validationResult(req.params);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email } = req.body;
      const name = req.body.name ? req.body.name : null;

      const prospect = await newProspect(storage, { name, email });
      return res.json(prospect);
    } catch (err) {
      return res.status(400).json({ done: false, error: err.message });
    }
  });

  router.put('/', validation, async (req, res) => {
    try {
      const errors = validationResult(req.params);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.body;
      const email = req.body.name ? req.body.name : null;
      const name = req.body.name ? req.body.name : null;
      const updated = await putProspect(storage, { id, email, name });
      return res.json(updated);
    } catch (err) {
      return res.status(400).json({ done: false, error: err.message });
    }
  });

  router.delete('/', async (req, res) => {
    try {
      const { id } = eq.params.id;

      const deleted = await dropProspect(storage, { id });
      return res.json(deleted);
    } catch (err) {
      return res.status(400).json({ done: false, error: err.message });
    }
  });

  return router;
};
