const Cart = require('../Models/Cart');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Utility function to validate required fields
const validateCartFields = (body) => {
  const { user, products, cartTotal } = body;
  if (!user) throw new AppError('User is required', 400);
  if (!products || products.length === 0)
    throw new AppError('Products are required', 400);
  if (cartTotal === undefined)
    throw new AppError('Cart total is required', 400);
};

// 1) Add To Cart
exports.addToCart = catchAsync(async (req, res, next) => {
  const { user, products, cartTotal, totalAfterDiscount } = req.body;

  // Validate required fields
  validateCartFields(req.body);

  // Check if cart exists for the user
  let cart = await Cart.findOne({ user });
  if (cart) {
    // Update existing cart
    cart.products = products;
    cart.cartTotal = cartTotal;
    cart.totalAfterDiscount = totalAfterDiscount;
    cart = await cart.save();
  } else {
    // Create new cart
    cart = await Cart.create({
      user,
      products,
      cartTotal,
      totalAfterDiscount,
    });
  }

  res.status(201).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

// 2) Update Cart
exports.updateCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { products, cartTotal, totalAfterDiscount } = req.body;

  if (!products || products.length === 0) {
    return next(new AppError('Products are required to update the cart', 400));
  }

  const updatedCart = await Cart.findByIdAndUpdate(
    id,
    { products, cartTotal, totalAfterDiscount },
    { new: true, runValidators: true }
  );

  if (!updatedCart) {
    return next(new AppError(`Cart with ID ${id} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      cart: updatedCart,
    },
  });
});

// 3) Delete Cart
exports.deleteCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const cart = await Cart.findByIdAndDelete(id);

  if (!cart) {
    return next(new AppError(`Cart with ID ${id} not found`, 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// 4) Get Cart List
exports.getCartList = catchAsync(async (req, res, next) => {
  const carts = await Cart.find().populate('user').populate('products.product');

  res.status(200).json({
    status: 'success',
    results: carts.length,
    data: {
      carts,
    },
  });
});

// 5) Get Cart by User ID
exports.getCartByUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const cart = await Cart.findOne({ user: userId })
    .populate('user')
    .populate('products.product');

  if (!cart) {
    return next(new AppError(`Cart for user ID ${userId} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});
