const express = require('express');

const router = express.Router();

const Order = require('../models/Recommendation');

router.post("/recommendations", async(req, res) => {
  try {
    let userData = await Order.findOne({"email": req.body.email});
    let resObj = [];

    if(userData) {
      resObj = userData.recommended_items;
    }

    res.json({orderData: resObj});
  } catch(error) {
    console.log(error.message);
    res.send(500, error.message);
  }

});

module.exports = router;
