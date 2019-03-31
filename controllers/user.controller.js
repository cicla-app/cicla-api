const User = require('../models/user.model');
const createError = require('http-errors');
const mailer = require('../services/mailer.service');

module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const user = new User(req.body);

  user.save()
    .then((user) => {
      mailer.sendConfirmEmail(user.email, user.confirmToken);
      res.status(201).json(user)
    })
    .catch(next)
}

module.exports.confirm = (req, res, next) => {
  User.findOne({ confirmToken: req.params.confirmToken })
    .then((user) => {
      if (!user) {
        throw createError(404, 'User not found');
      } else {
        user.confirmed = true;
        return user.save()
      }
    })
    .then(user => res.redirect('http://localhost:3000/onboarding'))
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