/* eslint-disable default-case */
/* eslint-disable no-await-in-loop */
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

// 1) Sign Up Function
exports.signup = catchAsync(async (req, res, next) => {
  const { fName, lName, email, password, passwordConfirm, role } = req.body;

  const newUser = await User.create({
    fName,
    lName,
    email,
    password,
    passwordConfirm,
    role, // Optionally allow setting role at signup
  });

  createSendToken(newUser, 201, res);
});

// 2) Login Function
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError(`Please provide email and password`, 400));
  }

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(`Incorrect email or password`, 401));
  }

  // 3) If everything is okay, send token to the client
  createSendToken(user, 200, res);
});

// 3) Get All Users Function
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

// 4) Update User Function
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const allowedFields = ['fName', 'lName', 'email', 'role'];
  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const updatedUser = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(new AppError(`User with ID ${id} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// 5) Delete User Function
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new AppError(`User with ID ${id} not found`, 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// 6) Change User Role Function
exports.changeUserRole = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  const allowedRoles = ['user', 'admin', 'moderator']; // Define allowed roles
  if (!allowedRoles.includes(role)) {
    return next(new AppError(`Invalid role specified`, 400));
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return next(new AppError(`User with ID ${id} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
