const express = require('express');
const customerQueryController = require('../Controllers/customerQueryController');

const router = express.Router();

// Route to create a new customerQuery
router.post('/', customerQueryController.createCustomerQuery);

// Route to get all customerQueries
router.get('/', customerQueryController.getAllCustomerQueries);

// Route to update a specific customerQuery by ID
router.patch('/:id', customerQueryController.updateCustomerQuery);

// Route to delete a specific customerQuery by ID
router.delete('/:id', customerQueryController.deleteCustomerQuery);

module.exports = router;
