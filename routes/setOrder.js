
const express = require('express');

const router = express.Router();

const Order = require('../models/Order');

router.post('/orderFood', async(req, res) => {
let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

  // if email does not exist, then create else insert
    let eId = await Order.findOne({ 'email': req.body.email })    
    if (eId===null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send(500, error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send(500, error.message)
        }
    }
})

module.exports = router;