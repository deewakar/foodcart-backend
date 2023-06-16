const express = require('express');

const router = express.Router();

const Order = require('../models/Recommendation');

router.post("/recommendations", async(req, res) => {
  try {
    let userData = await Order.findOne({"email": req.body.email});
    let resObj = [];
    let indices = [];

    if(userData) {
      resObj = userData.recommended_items[0];
    }

    if(resObj.length > 0) {
      items = resObj;
      for(let i = 0,j = 0; i < items.length, j < 8; i++) {
        let r = Math.floor(Math.random()*items.length);
        if(!indices.includes(r)) {
          indices.push(r);
          j++;
        }
      }
      resObj = items.filter((item, pos) => indices.includes(pos));
    }

    res.json({data: resObj});
  } catch(error) {
    console.log(error.message);
    res.send(500, error.message);
  }

});

module.exports = router;
