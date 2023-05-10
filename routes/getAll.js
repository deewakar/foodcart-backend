
const express = require('express');

const router = express.Router();

router.post('/', async(req, res) => {
  try{
    res.json([global.all_items, global.categories]);
  } catch(err) {
    console.log(err);
    res.json({success: false});
  }
});

module.exports = router;
