const Order = require('../Models/Order');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Utility function to validate required fields
const validateOrderFields = (body) => {
  const { user, products, total } = body;
  if (!user) throw new AppError('User is required', 400);
  if (!products || products.length === 0)
    throw new AppError('Products are required', 400);
  if (total === undefined) throw new AppError('Total price is required', 400);
};

// 1) Create Order
exports.createOrder = catchAsync(async (req, res, next) => {
  // Validate required fields
  validateOrderFields(req.body);

  const order = await Order.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      order,
    },
  });
});

// 2) Get Order by ID
exports.getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate('user')
    .populate('products.product');

  if (!order) {
    return next(new AppError(`Order with ID ${id} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      order,
    },
  });
});

// 3) Update Order Status
exports.updateOrderStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    'Not Processed',
    'Processing',
    'Dispatched',
    'Cancelled',
    'Completed',
  ];
  if (!allowedStatuses.includes(status)) {
    return next(new AppError('Invalid status', 400));
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!updatedOrder) {
    return next(new AppError(`Order with ID ${id} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      order: updatedOrder,
    },
  });
});

// 4) Delete Order
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    return next(new AppError(`Order with ID ${id} not found`, 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// 5) Get All Orders
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find()
    .populate('user')
    .populate('products.product');

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders,
    },
  });
});
