const express = require('express');
const CartController = require('../Controllers/CartController');

const router = express.Router();

// Middleware to check if user is logged in (for authenticated routes)
// const { protect } = require('../middleware/authMiddleware');

// Route to add or update a cart
router.post('/add', CartController.addToCart);

// Route to update a specific cart by ID
router.patch('/:id', CartController.updateCart);

// Route to delete a specific cart by ID
router.delete('/:id', CartController.deleteCart);

// Route to get the list of all carts
router.get('/', CartController.getCartList);

// Route to get a specific cart by user ID
router.get('/user/:userId', CartController.getCartByUser);

module.exports = router;
