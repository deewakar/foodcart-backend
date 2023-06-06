
const mongoose = require('mongoose');
const {Schema} = mongoose;

/* Generated recommendations for a user */
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
