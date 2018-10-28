const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
    
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    trim: true,
  },
  isAdmin: Boolean,
  cat : {
    type: String,
    enum: ['fre', 'fam', 'org'],
    required: function() {
      return this.isAdmin ;
    }
  }
},{strict: false});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

userSchema.methods.save =  function() {
  this.save();
}
function validateUser(user) {
  const schema = {
      login: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      cat: Joi.string().min(2)

  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;