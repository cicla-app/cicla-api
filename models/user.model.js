const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const constants = require('../constants');
const SALT_WORK_FACTOR = 10;

const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/i;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d){6,}/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'email is required',
    unique: true,
    validate: emailPattern
  },
  password: {
    type: String,
    required: 'password is required', 
    validate: passwordPattern
  },
  alias: String,
  confirmed: {
    type: Boolean,
    default: false
  },
  confirmToken: String,
  colaborator: {
    type: String,
    validate: emailPattern
  },
  role: {
    type: String,
    enum: Object.values(constants.roles),
    default: constants.roles.user
  },
  periodDays: {
    type: Number,
    min: 1,
    max: 8,
    default: 5
  },
  cycleDays: {
    type: Number,
    min: 21,
    max: 35,
    default: 31
  },
  contraceptives: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      delete ret.confirmToken;
      return ret;
    }
  }
})

userSchema.pre('save', function(next) {
  const user = this;

  if (user.isNew) {
    this.confirmToken = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
  }

  if (!user.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          })
      })
      .catch(error => next(error))
  }
});
  
userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema)

module.exports = User;
