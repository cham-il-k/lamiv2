const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProduitSchema =  new Schema({
	name: {type: String,lowercase: true},
	description: {type: String, lowercase: true },
	category: { type: Schema.Types.ObjectId, ref:'Category'},
	prix: Number,
	image: String,
	level: Number,
});

module.exports = mongoose.model('Produit',ProduitSchema);    
