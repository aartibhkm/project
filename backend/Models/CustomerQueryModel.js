const mongoose = require('mongoose');

const CustomerQuerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  project: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  associatedUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CustomerQuery = mongoose.model('CustomerQuery', CustomerQuerySchema);

module.exports = CustomerQuery;
