const mongoose = require('mongoose');
const {Schema} = mongoose;

const PopularSchema = new Schema({
  food_id: {
    type: String,
    required: true,
    unique: true
  },
  food_name: {
    type: String,
    required: true,
  },
  popularity_count: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Popular', PopularSchema);
