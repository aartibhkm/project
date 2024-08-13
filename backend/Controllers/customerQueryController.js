const CustomerQuery = require('../Models/CustomerQueryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// 1) Create Customer Query
exports.createCustomerQuery = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    mobile,
    address,
    state,
    city,
    project,
    message,
    associatedUser,
  } = req.body;

  const newQuery = await CustomerQuery.create({
    name,
    email,
    mobile,
    address,
    state,
    city,
    project,
    message,
    associatedUser,
  });

  res.status(201).json({
    status: 'success',
    data: {
      query: newQuery,
    },
  });
});

// 2) Get All Customer Queries
exports.getAllCustomerQueries = catchAsync(async (req, res, next) => {
  const queries = await CustomerQuery.find();

  res.status(200).json({
    status: 'success',
    results: queries.length,
    data: {
      queries,
    },
  });
});

// 3) Update Customer Query
exports.updateCustomerQuery = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const allowedFields = [
    'name',
    'email',
    'mobile',
    'address',
    'state',
    'city',
    'project',
    'message',
  ];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const updatedQuery = await CustomerQuery.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedQuery) {
    return next(new AppError(`Customer Query with ID ${id} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      query: updatedQuery,
    },
  });
});

// 4) Delete Customer Query
exports.deleteCustomerQuery = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const query = await CustomerQuery.findByIdAndDelete(id);

  if (!query) {
    return next(new AppError(`Customer Query with ID ${id} not found`, 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
