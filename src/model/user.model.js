const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserModel = new Schema({
  email: String,
  password: String,
},
{
    timestamps: true
});

module.exports = mongoose.model('User', UserModel);