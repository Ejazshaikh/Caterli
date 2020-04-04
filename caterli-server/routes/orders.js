const { Order, validate } = require('../models/order');
const auth = require('../middlewares/auth');
const express = require('express');
const _ = require("lodash");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/',auth, async (req, res) => {
  const { food } = req.body;
  req.body.food = JSON.parse(food);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let order = new Order(req.body);
  await order.save();
  res.status(200).send();
})

module.exports = router;