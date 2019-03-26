const User = require('../models/user.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const user = new User(req.body);

  user.save()
    .then((user) => res.status(201).json(user))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json())
    .catch(next)
}

module.exports.get = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        throw createError(404, 'User not found');
      }
    })
    .catch(next)
}

module.exports.edit = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(card => {
      if (!card) {
        throw createError(404, 'User not found');
      } else {
        res.json(card);
      }
    })
    .catch(next);
}