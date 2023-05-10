const express = require('express');

const router = express.Router();

const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const jwtPrivateKey = process.env.JWT_SECRET;

const User = require('../models/User')


router.post('/createuser/', [
  /* validate given details before creating a new user */
  body('email').isEmail(),
  body('password').isLength({min: 6 }),
  body('name').isLength({ min: 3 })
],async(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({success: false, errors: errors.array() });
  }

  const saltRounds = 10;
  let passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  try{
    await User.create({
      name: req.body.name,
      password: passwordHash,
      email: req.body.email,
      location: req.body.location
    });
    res.json({success: true});
  } catch(err) {
    console.log(err);
    res.json({success: false});
  }
});


router.post('/login/', [
  /* validate given details before creating a new user */
  body('email').isEmail(),
  body('password').isLength({min: 6 }),
],async(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({success: false, errors: errors.array() });
  }

  const { email, password } = req.body;
  try{
    let user = await User.findOne({ email});
    if(!user) {
      return res.status(400).json({success: false, error: "Incorrect username or password"});
    }

    const passCmp = await bcrypt.compare(password, user.password);
    if(!passCmp) {
      return res.status(400).json({success: false, error: "Incorrect username or password"});
    }

    const data = {
      user : {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, jwtPrivateKey);

    res.json({success: true, authToken});

  } catch(err) {
    console.log(err);
    res.json({success: false});
  }
});



module.exports = router;
