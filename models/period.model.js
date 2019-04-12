const mongoose = require ('mongoose');
const moment = require('moment');
const constants = require('../constants');
const User = require('../models/user.model');

const periodSchema = new mongoose.Schema( {
  startPeriod: {
    type: Date,
    //required: true
  },
  endPeriod: Date,
  endCycle: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  stages: {
    follicular: {
      primary: Date,
      secondary: Date,
      latest: Date
    },
    ovulation: Date,
    lutea: {
      primary: Date,
      secondary: Date,
      latest: Date
    }
  }
},{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

periodSchema.methods.calculate = function(user = {}) {
  const period = this;

  period.endPeriod = moment(period.startPeriod).add('days', (user.periodDays)  || 5);
  period.endCycle = moment(period.startPeriod).add('days', (user.cycleDays) || 31);
  
  const ovulation = moment(period.endCycle).subtract('days', (Math.round(user.cycleDays / 2)) || 15)
  
  period.stages = {
    ovulation: ovulation,
    follicular: {
      primary: period.endPeriod,
      secondary: moment(period.endPeriod).add('days', 2),
      latest: moment(ovulation).subtract('days', 1)
    },
    lutea: {
      primary: moment(ovulation).add('days', 5),
      secondary: moment(ovulation).add('days', 8),
      latest: period.endCycle
    }
  }
  return period;
}

const Period = mongoose.model('Period', periodSchema);

module.exports = Period;
