const InstallationQuery = require('../Models/installationQueryModel'); // Adjust the path as necessary
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// 1) Create Installation Query
exports.createInstallationQuery = catchAsync(async (req, res, next) => {
  const { customerName, address, phoneNumber, problemFacing, associatedUser } =
    req.body;

  const newQuery = await InstallationQuery.create({
    customer_name: customerName,
    address,
    phone_number: phoneNumber,
    description_of_problem_facing: problemFacing,
    associatedUser,
  });

  res.status(201).json({
    status: 'success',
    data: {
      query: newQuery,
    },
  });
});

// 2) Get All Installation Queries
exports.getAllInstallationQueries = catchAsync(async (req, res, next) => {
  const queries = await InstallationQuery.find();

  res.status(200).json({
    status: 'success',
    results: queries.length,
    data: {
      queries,
    },
  });
});

// 3) Update Installation Query
exports.updateInstallationQuery = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const allowedFields = [
    'customer_name',
    'address',
    'phone_number',
    'description_of_problem_facing',
  ];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const updatedQuery = await InstallationQuery.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedQuery) {
    return next(
      new AppError(`Installation Query with ID ${id} not found`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      query: updatedQuery,
    },
  });
});

// 4) Delete Installation Query
exports.deleteInstallationQuery = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const query = await InstallationQuery.findByIdAndDelete(id);

  if (!query) {
    return next(
      new AppError(`Installation Query with ID ${id} not found`, 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
