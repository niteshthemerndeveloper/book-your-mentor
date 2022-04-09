const { check, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const middlewareAuth = require('../middleware/middlewareAuth.js');
const Order = require('../models/Order.js');
const setDevAndProdVars = require('../config/setDevAndProdVars.js');

const configVars = setDevAndProdVars();

const { stripeSecretKey } = configVars;

const stripe = require('stripe')(stripeSecretKey);
// Get created stripe service items
const createBookingItemsForStripe = require('../config/createBookingItemsForStripe.js');

// @route     POST /api/stripe/proceed-to-checkout
// @desc      Create a Stripe Checkout Session for User
// @access    Public
router.post(
  '/',
  [middlewareAuth, [check('bookingId', 'No Booking Item Found').notEmpty()]],
  async (req, res) => {
    // Check Sent data scope and certainty.
    const errors = validationResult(req);

    // Check if errors not empty
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }

    // Create a Current Domain URL
    let currentDomainURL = `${req.protocol}://${req.get('host')}`;
    currentDomainURL = 'http://localhost:3000';

    // Create Booking Item for Stripe Checkout Session
    const bookingItem = createBookingItemsForStripe(req.body.bookingId);

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        // Create service items for stripe checkout session
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: bookingItem.name,
              },
              unit_amount: bookingItem.price,
            },
            quantity: 1,
          },
        ],
        success_url: `${currentDomainURL}/success`,
        cancel_url: `${currentDomainURL}/failure`,
      });

      const orderDetails = {
        orderId: bookingItem.id,
        price: bookingItem.price / 100,
      };

      // Redirect user to success or failure URL
      res.json({ url: session.url, orderDetails });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Failed to Respond!');
    }
  }
);

module.exports = router;
