const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  car_type: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  dealer: {
    type: String,
    required: true,
  },
  images: {
    type: [String], 
    validate: [arrayLimit, '{PATH} exceeds the limit of 10'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

function arrayLimit(val) {
  return val.length <= 10;
}

module.exports = mongoose.model('Product', productSchema);

