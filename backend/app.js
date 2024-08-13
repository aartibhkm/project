const path = require('path');
const express = require('express');

const cors = require('cors');
const rateLimit = require('express-rate-limit');

const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
// const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controllers/errorController');

const userRouter = require('./Routes/userRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const productRoutes = require('./Routes/productRoutes');
const customerQueryRoutes = require('./Routes/customerQueryRoutes');
const installationQueryRoutes = require('./Routes/installationQueryRoutes');
// const cronController = require('./Controllers/cronController');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
// rate-limiter
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again',
});

// Body Parser -- reading data from body into req.body
app.use(express.json({ limit: '100kb' }));
app.use(express.static('public'));

// Data sanitization against noSql Query
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Prevent Parameter Pollution
// app.use(hpp());

app.use('/api', limiter);

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/customerQuery', customerQueryRoutes);
app.use('/api/v1/installationQuery', installationQueryRoutes);
// cronController.pvMatchingCron();
// cronController.validateEpins();

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
