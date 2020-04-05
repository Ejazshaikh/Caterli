const {Restaurant, validate} = require('../models/restaurant');
const asyncMiddleWare = require('../middlewares/async');
const express = require('express');
const _ = require("lodash");
const mongoose = require("mongoose");
const router = express.Router();

router.get('/', asyncMiddleWare(async (req, res, next) => {
  const restaurantList = await Restaurant.find({});
  res.send(restaurantList);
}));

router.get('/search', async (req, res) => {
  const queryText = req.query.text;
  const restaurantList = await Restaurant.find({'name': new RegExp(`.*${queryText}.*`, "i")})
  res.send(restaurantList);
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('Invalid ID.');
  const restaurant = await Restaurant.findById(id);
  res.send(restaurant);
})

// router.post('/', async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);
//   let restaurant = new Restaurant(_.pick(req.body, ['name', 'type', 'category', 'menu', 'profilePicLoc']))
//   await restaurant.save();
//   res.status(200).send(restaurant);
// })

module.exports = router;
