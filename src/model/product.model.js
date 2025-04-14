const mongoose = require('mongoose')
const { Schema } = mongoose;

const ProductModel = new Schema({
    brand: String,
    name: String,
    price: String,
    rating: Number,
    seller: String,
},
{
    timestamps: true
});

module.exports = mongoose.model('Product', ProductModel);