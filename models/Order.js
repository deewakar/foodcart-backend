const mongoose = require('mongoose');
const {Schema} = mongoose;

/* All food orders by a user, email: user's email */
const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  order_data: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('Order', OrderSchema);
