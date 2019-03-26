require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.routes');
const periodRoutes = require('./routes/period.routes');
const authRoutes = require('./routes/auth.routes');

const secure = require('./middlewares/secure.mid');

const passport = require('passport');

require('./configs/db.config');
require('./configs/session.config');
require('./configs/passport.config');

const session = require('./configs/session.config');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);
app.use('/users/:userId/periods', secure.isUser('userId'), periodRoutes);
app.use('/', authRoutes);


app.use((req, res, next) => {
  res.locals.session = req.user;
  next();
})

// 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (error, req, res, next) {
  console.error(error);

  res.status(error.status || 500);

  const data = {}

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);
    for (field of Object.keys(error.errors)) {
      error.errors[field] = error.errors[field].message
    }
    data.errors = error.errors
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found')
  }

  data.message = error.message;
  res.json(data);
});

module.exports = app;