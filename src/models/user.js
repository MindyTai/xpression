const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    required:[true, "Password is a required field"],
    trim: true,
  },
  email: {
    type: String,
    required:[true, "Email is a required field"],
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function(val) {
        if(!validator.isEmail(val)){
          throw new Error('Email is invalid.')
        }
      },
    }
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User
