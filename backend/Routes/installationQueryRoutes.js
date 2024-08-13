const express = require('express');
const installationQueryController = require('../Controllers/installationQueryController');

const router = express.Router();

// Route to create a new installationQuery
router.post('/', installationQueryController.createInstallationQuery);

// Route to get all installationQuery
router.get('/', installationQueryController.getAllInstallationQueries);

// Route to update a specific installationQuery by ID
router.patch('/:id', installationQueryController.updateInstallationQuery);

// Route to delete a specific installationQuery by ID
router.delete('/:id', installationQueryController.deleteInstallationQuery);

module.exports = router;
