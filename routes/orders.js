const express = require('express');
const router = express.Router();
const middlewareAuth = require('../middleware/middlewareAuth.js');
const Order = require('../models/Order.js');
const User = require('../models/User.js');
const { check, validationResult } = require('express-validator');

// Orders will be sent to the Logged In User;

// @route     GET api/orders
// @desc      Get users orders from server
// @access    Private
router.get('/', middlewareAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json({ orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Failed to Respond!');
  }
});

// @route     POST api/orders
// @desc      Add Users orders in the MongoDB
// @access    Private
router.post('/', middlewareAuth, async (req, res) => {
  const { orderId, price, status } = req.body;

  try {
    const newOrder = await new Order({
      orderId,
      price,
      status,
      user: req.user.id,
    });

    await newOrder.save();

    const orders = await Order.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json({ orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Failed to Respond! ');
  }
});

module.exports = router;
