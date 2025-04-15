const mongoose = require('mongoose')
const { Schema } = mongoose;

const CartModel = new Schema({
    productId: String,
    userId: String,
},
{
    timestamps: true
});

module.exports = mongoose.model('Cart', CartModel);