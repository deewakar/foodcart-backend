const express = require('express');
const router = express.Router();

const food_item = require('../models/FoodItem.js');

/* for adding a new food item to the database */
router.post("/addfood/", async(req, res) => {
  let cost = Object.values(req.body.options[0]).reduce((acc,item) => acc + parseInt(item), 0);
  try{
    await food_item.create({
      name: req.body.name,
      CategoryName: req.body.CategoryName,
      options: req.body.options,
      img: req.body.img,
      description: req.body.description,
      _source: req.body._source,
      _price: (cost >= 500 ? "high" : (cost >= 300 ? "medium" : "low"))
    });
    res.json({success: true});
  } catch(err) {
    console.log(err);
    res.status(500).json({success: false});
  }
  
});

module.exports = router;
