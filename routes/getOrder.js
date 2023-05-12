
const express = require('express');

const router = express.Router();

const Order = require('../models/Order');

router.post("/orderHistory", async(req, res) => {
  try {
    let userData = await Order.findOne({"email": req.body.email});
    let resObj = [];
    let orderInstance = []; 
    userData.order_data.map((order) => {
      orderInstance[0] = order[0].order_date;
      orderInstance.splice(1,0,...(order.slice(1)));
      resObj.push(orderInstance);
    });

    res.json({orderData: resObj});
  } catch(error) {
    console.log(error.message);
    res.send("Server Error", error.message);
  }

});

module.exports = router;
