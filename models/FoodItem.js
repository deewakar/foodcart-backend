const mongoose = require('mongoose');
const {Schema} = mongoose;

/* Schema for a food item available on the platform */
const FoodSchema = new Schema({
  "CategoryName": {
    "type": "String"
  },
  "name": {
    "type": "String"
  },
  "options": {
    "type": [
      "Mixed"
    ]
  },
  "img": {
    "type": "String"
  },
  "description": {
    "type": "String"
  },
  "_price": {
    "type": "String"
  },
  "_source": {
    "type": "String"
  }
});

module.exports = mongoose.model('food_item', FoodSchema);
