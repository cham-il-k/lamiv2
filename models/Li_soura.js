const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const souraSchema = new Schema({
            number : Number,
            text : String,
            numberInSurah : Number,
            juz : Number
    })

const Soura = mongoose.model('soura', souraSchema);
module.exports = Soura;
