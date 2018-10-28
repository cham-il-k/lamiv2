const mongoose = require('mongoose');
const Schema = mongoose().Schema;


const UsagerShema = new Schema({
	email: {type: String, trime: true, required: true},
	emailUser: { type: String, trime: true, required: true},
	coord: {
		level: Number,
		cards: [Number],
		team: String,
		country:String,
		town: String,
		
}

});    