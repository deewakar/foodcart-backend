
const express = require('express');

const router = express.Router();

const Order = require('../models/Order');

router.post("/orderHistory", async(req, res) => {
  try {
    let userData = await Order.findOne({"email": req.body.email});
    let resObj = [];

    if(userData) {
    resObj = userData.order_data.map((order) => {
      let orderInstance = []; 
      orderInstance.push(order[0].Order_date);
      orderInstance.splice(1,0,...(order.slice(1)));
      return orderInstance;
    });
    }

    res.json({orderData: resObj});
  } catch(error) {
    console.log(error.message);
    res.send(500, error.message);
  }

});

module.exports = router;
