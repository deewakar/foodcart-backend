
const mongoose = require('mongoose');
const {Schema} = mongoose;

const RecommendationSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  recommended_items: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
