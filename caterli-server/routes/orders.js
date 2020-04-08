const express = require('express');
const { Order, validate } = require('../models/order');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { food } = req.body;
  req.body.food = JSON.parse(food);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const order = new Order(req.body);
  await order.save();
  return res.status(200).send();
});

module.exports = router;
