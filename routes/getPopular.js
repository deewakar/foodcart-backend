const express = require('express');

const router = express.Router();

const Order = require('../models/Popular');


function cmp(a, b) {
  return b.popularity_count - a.popularity_count;
}

router.post("/popular", async(req, res) => {
  try {
    let PopularData = await Order.find({});

    let all_items = await global.all_items;
    let item_map = {};
    all_items.map((obj) => item_map[obj["_id"]] = obj);

    PopularData = PopularData.sort(cmp).slice(0,4);
    resObj = PopularData.map((obj) => item_map[obj.food_id]);
    res.json(resObj);
  } catch(error) {
    console.log(error.message);
    res.send(500, error.message);
  }

});

module.exports = router;
