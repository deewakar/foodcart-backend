
const express = require('express');

const router = express.Router();

const food_item = require('../models/FoodItem');
const food_cat = require('../models/FoodCategory');

router.post('/', async(req, res) => {
  try{
    let foodData = await food_item.find({});
    let catData = await food_cat.find({});
    res.json([foodData, catData]);
  } catch(err) {
    console.log(err);
    res.json({success: false});
  }
});

module.exports = router;
