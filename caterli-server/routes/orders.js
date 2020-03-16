const {Order, validate} = require('../models/order');
const express = require('express');
const _ = require("lodash");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  console.log('h', req.header('x-auth-token'));
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, "jwtPrivateToken");
    req.user = decoded; 
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }

  const { food } = req.body;
  req.body.food = JSON.parse(food);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let order = new Order(req.body)
  await order.save();
  res.status(200).send();
})

module.exports = router;