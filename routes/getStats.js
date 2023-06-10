
const express = require('express');

const router = express.Router();

const { fork } = require('child_process');

const createRecommendations = require('../utils/recommender');

const recommender_path = require.resolve('../utils/recommender');

router.post('/dashboard', async(req, res) => {
  try {
  let email = req.body.email;
  let maxTrees = req.body.maxTrees ?? 3; // maxTrees = 3 by default
  
  // create/update recommendations collection for this user
  let {trees, votes} = await createRecommendations(email, maxTrees);

  res.json({trees: trees, votes: votes});
  } catch(error) {
    console.log(error.message);
    res.send(500, error.message);
  }

});

module.exports = router;
