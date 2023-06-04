const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
  "CategoryName": {
    "type": "String"
  }});

module.exports = mongoose.model('food_category', categorySchema);
