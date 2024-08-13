const Product = require('../Models/Product');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// 1) Create Product
exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});

// 2) Update Product
exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    return next(new AppError(`Product with ID ${id} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product: updatedProduct,
    },
  });
});

// 3) Delete Product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new AppError(`Product with ID ${id} not found`, 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// 4) Get All Products
exports.getProducts = catchAsync(async (req, res, next) => {
  const { category, id } = req.query; // Get the category from the query parameters

  if (id) {
    const product = await Product.findById(id); // Find a product by ID
    return res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  }
  const query = {};
  if (category) {
    query.category = category; // If category is provided, add it to the query
  }

  const products = await Product.find(query); // Find products based on the query

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});
