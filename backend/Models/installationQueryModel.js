const mongoose = require('mongoose');

const installationQuerySchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone_number: {
    type: String,
    trim: true,
  },
  description_of_problem_facing: {
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

const InstallationQuery = mongoose.model(
  'InstallationQuery',
  installationQuerySchema
);

module.exports = InstallationQuery;
