const express = require('express');
const authenticationController = require('../Controllers/authenticationController');

const router = express.Router();

// Route for user signup
router.post('/signup', authenticationController.signup);

// Route for user login
router.post('/login', authenticationController.login);

// Route to get all users
router.get('/allusers', authenticationController.getAllUsers);

// Route to update a user by ID
router.patch('/updateuser/:id', authenticationController.updateUser);

// Route to delete a user by ID
router.delete('/deleteuser/:id', authenticationController.deleteUser);

// Route to change a user's role by ID
router.patch('/changerole/:id', authenticationController.changeUserRole);

module.exports = router;
