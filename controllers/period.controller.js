const Period = require('../models/period.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  Period.find()
    .then((periods) => res.json(periods))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const period = new Period({
    ...req.body,
    user: req.params.userId
  });

  period.save()
    .then((period) => res.status(201).json(period))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Period.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json())
    .catch(next)
}

module.exports.get = (req, res, next) => {
  Period.findById(req.params.id)
    .then(period => {
      if (period) {
        res.json(period)
      } else {
        throw createError(404, 'Period not found');
      }
    })
    .catch(next)
}

module.exports.edit = (req, res, next) => {
  delete req.body.user;

  Period.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(card => {
      if (!card) {
        throw createError(404, 'Period not found');
      } else {
        res.json(card);
      }
    })
    .catch(next);
}