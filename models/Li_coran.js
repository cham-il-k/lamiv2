const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const coranShema = new Schema({
    number : Number,
    name : String,
    englishName : String,
    englishNameTranslation : String,
    revelationType : String,
    ayahs : [ 
        {
            number : Number,
            text : String,
            numberInSurah : Number,
            juz : Number
    }] 

})

const Coran = mongoose.model('Coran', coranShema);
module.exports = Coran;