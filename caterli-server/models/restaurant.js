const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  type: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 150,
  },
  category: {
    type: String,
    enum: ['VEG', 'NON-VEG'],
    required: true,
  },
  profilePicLoc: {
    type: String,
    maxlength: 1024,
  },
  menu: [
    {
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
      },
      category: {
        type: String,
        enum: ['VEG', 'NON-VEG'],
        required: true,
      },
      price: {
        type: Number,
        min: 1,
        max: 5000,
        required: true,
      },
    },
  ],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

function validateResaurant(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    type: Joi.string().min(2).max(150).required(),
    profilePicLoc: Joi.string().min(3).max(1024),
    category: Joi.string().required(),
    menu: Joi.array().items(
      Joi.object({
        name: Joi.string().min(3).max(50).required(),
        category: Joi.string().required(),
        price: Joi.number().min(1).max(5000).required(),
      }),
    ),
  });

  return schema.validate(user);
}

exports.Restaurant = Restaurant;
exports.validate = validateResaurant;
