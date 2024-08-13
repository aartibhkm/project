const express = require('express');
const OrderController = require('../Controllers/orderController');

const router = express.Router();

// Middleware to check if user is logged in (for authenticated routes)
// const { protect } = require('../middleware/authMiddleware');

// Route to create a new order
router.post('/', OrderController.createOrder);

// Route to get a specific order by ID
router.get('/:id', OrderController.getOrderById);

// Route to update the status of a specific order by ID
router.patch('/:id/status', OrderController.updateOrderStatus);

// Route to delete a specific order by ID
router.delete('/:id', OrderController.deleteOrder);

// Route to get the list of all orders
router.get('/', OrderController.getAllOrders);

module.exports = router;
