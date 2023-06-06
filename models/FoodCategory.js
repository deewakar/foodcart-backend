const mongoose = require('mongoose');
const {Schema} = mongoose;

/* Category Name associated with each food item */
const categorySchema = new Schema({
  "CategoryName": {
    "type": "String"
  }});

module.exports = mongoose.model('food_category', categorySchema);
