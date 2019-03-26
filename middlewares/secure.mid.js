const createError = require('http-errors');
const constants = require('../constants');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else throw createError(403);
}

module.exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) next();
    else throw createError(401);
  }
}

module.exports.isUser = (idKey = 'id') => (req, res, next) => {
  if (req.isAuthenticated() && req.user._id.toString() === req.params[idKey]) next();
  else throw createError(401);
}

module.exports.deleteRoleParam = (req, res, next) => {
  delete req.body.role;
  next()
}

