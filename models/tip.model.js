const mongoose = require ('mongoose');
const constants = require('../constants');

const tipSchema = new mongoose.Schema( {
    title: {
      type: String
    },
    description: {
      type: String
    },
    type: {
      enum: constants.type,
    },
    startStage: {
      enum: constants.type,
    },
    endStage: {
      enum: constants.type,
    },
    contraceptives: {
      type: Boolean,
      default: false
    }
},{timestamps: true,
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

const Tip = mongoose.model('Tip', tipSchema);

module.exports = Tip;