const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Tablet = mongoose.model('Tablet', new mongoose.Schema({
  Num: {
    type: Number,
    required: true,
    trim: true, 
  },
  genreId: { 
    type: genreSchema,  
    required: true
  },
  numberSoura: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
  
},{strict: false})
);

function validateTablet(tablet) {
  const schema = {
    Num: Joi.number().min(1).required(),
    genreId: Joi.objectId().required(),
    numberSoura: Joi.number().min(1).max(114).required(),
   };

  return Joi.validate(movie, schema);
}

exports.Tablet = Tablet; 
exports.validate = validateTablet;