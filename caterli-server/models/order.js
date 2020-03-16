const Joi = require('@hapi/joi');

const mongoose = require('mongoose');

Joi.objectId = require('joi-objectid')(Joi)

const orderSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  food: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant.menu',
      required: true,
    },
    count: {
      type: Number,
      required: true,
      max: 100,
      min: 1
    }
  }],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
    maxlength: 1024,
  }
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    restaurant: Joi.objectId().required(),
    customer: Joi.objectId().required(),
    address: Joi.string().max(1024).required(),
    amount: Joi.number().required(),
    food: Joi.array().items(Joi.object({
      item: Joi.objectId().required(),
      count: Joi.number().required(),
  }))
  });

  return schema.validate(order)
}

exports.Order = Order; 
exports.validate = validateOrder;