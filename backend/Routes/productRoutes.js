const express = require('express');
const ProductController = require('../Controllers/productController');

const router = express.Router();

// Middleware to check if user is logged in (for authenticated routes)
// const { protect } = require('../middleware/authMiddleware');

// Route to create a new product
router.post('/', ProductController.createProduct);

// Route to update a specific product by ID
router.patch('/:id', ProductController.updateProduct);

// Route to delete a specific product by ID
router.delete('/:id', ProductController.deleteProduct);

// Route to get the list of all products
router.get('/', ProductController.getProducts);

module.exports = router;
