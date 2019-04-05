const mongoose = require ('mongoose');
const constants = require('../constants');
const User = require('../models/user.model');

const periodSchema = new mongoose.Schema( {
  startPeriod: {
    type: Date,
    required: 'startPeriod is required'
  },
  endPeriod: {
    type: Date
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

periodSchema.virtual('startFollicularPrimaryStage').get(function () {
  return this.startPeriod
});

periodSchema.virtual('endFollicularPrimaryStage').get(function () {
  return this.endPeriod
});

periodSchema.virtual('startCycle').get(function () {
  return this.startPeriod
});

periodSchema.virtual('endCycle').get(async function () {
  return "TODO"
});

periodSchema.pre('save', function (next) {
  if (this.endPeriod === undefined) {
    const endPeriod = new Date(this.startPeriod);
    endPeriod.setDate(this.startPeriod.getDate() + 5);
    this.endPeriod = endPeriod;
  }

  next();
}
);

const Period = mongoose.model('Period', periodSchema);

module.exports = Period;
