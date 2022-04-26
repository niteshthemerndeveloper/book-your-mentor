/**************************************************/
/*********** STRIPE CHECKOUT ROUTE CODE ***********/
// ---------Idea------------------------------------------------
/***** To import the Required Functions and Models *****/
// const Transaction = require('../models/Transaction');
// const User = require('../models/User');

// ---------Idea------------------------------------------------
/***** To Create Service Items for Stripe Checkout Session *****/
// const serviceItems = new Map([
//   [1, { priceInCents: 1000, name: 'Window Cleaning' }],
//   [2, { priceInCents: 500, name: 'French Doors' }],
//   [3, { priceInCents: 1500, name: 'Construction Debris Removal' }],
// ]);

// ---------Idea------------------------------------------------
/***** For Testing if the Items getting Generated right *****/
// const formInputsParams = {
//   constructionDebris: 2,
//   drivewayCleaning: 0,
//   frenchDoors: 2,
//   gutterCleaning: 'gutterCleaning',
//   panels: 'p',
//   roofCleaning: 0,
//   windows: '0',
// };

/*
 **
 **
 **
 */

// ---------Idea------------------------------------------------
/***** To Create a Transaction in mongoDB after a session *****/
// Create New Transaction Details
// const transactionFields = {};

// const { id, amount_total, customer_email, payment_status } = session;

// if (id) transactionFields.stripeId = id;
// if (req.body.email)
//   transactionFields.email = req.body.formInputParams.email;
// if (amount_total) transactionFields.totalAmount = amount_total;
// if (payment_status) transactionFields.transactionStatus = payment_status;

// let transaction = new Transaction(transactionFields);

// await transaction.save();

/*
 **
 **
 **
 */

// ---------Idea------------------------------------------------
/***** To Create Items for Stripe Checkout Session Manually *****/
// line_items: [
//   {
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: 'Window Cleaning Services',
//       },
//       unit_amount: paymentAmount * 100,
//     },
//     quantity: 1,
//   },
//   {
//     price_data: {
//       currency: 'usd',
//       product_data: {
//         name: 'Window Cleaning Services',
//       },
//       unit_amount: paymentAmount * 100,
//     },
//     quantity: 1,
//   },
// ],

/*
 **
 **
 **
 */

// ---------Idea------------------------------------------------
/***** To not let the user proceed to stripe checkout session if not qualified the Minimum Service Amount *****/
// const paymentAmount = req.body.paymentAmount * 100;
// let totalServiceItemsCost = 0;

// stripeServiceItems.forEach(
//   (item) => (totalServiceItemsCost += item.priceInCents)
// );
// if (totalServiceItemsCost < paymentAmount) {
//   console.log(totalServiceItemsCost, paymentAmount);
//   return;
// }

/*
 **
 **
 **
 */
// ---------Idea------------------------------------------------
/***** To Create a Customer in the Stripe Dashboard  *****/

// const customer = await stripe.customers.create({
//   name: 'Umair Rizwan',
//   email,
//   phone,
//   address: {
//     line1: address,
//   },
//   description: 'Create a Customer',
// });

// ---------Idea------------------------------------------------
/***** To store the secret key somewhere *****/
// "stripeSecretKey": "sk_test_590iuuihhhdkhadeujrfjfhebfbeujh4BmqTCvo7OA6MpJ7rZKFfdfYojtSjXdl8CeiftntlzGsRYIRJyho99l00e399nul1666554tgyhgfrhjuuh",

/*
 **
 **
 **
 */
/**************************************************/
/*********** STRIPE CUSTOMER ROUTE CODE ***********/
// ---------Idea------------------------------------------------
/***** To Create a New Stripe Customer using Stripe API *****/
// const { check, validationResult } = require('express-validator');
// const express = require('express');
// const router = express.Router();
// const config = require('config');

// let stripeSecretKey;

// if (process.env.NODE_ENV === 'production') {
// Set stripeSecretKey in production env
//   stripeSecretKey = process.env.stripeSecretKey;
// } else {
// Set stripeSecretKey in dev env
// stripeSecretKey = config.get('stripeSecretKey');
// }

// const stripe = require('stripe')(stripeSecretKey);

// @route     POST /api/stripe/create-customer
// @desc      Create a New Stripe Customer
// @access    Public
// router.post(
//   '/',
//   [
//     check('firstName', 'Please enter your first name').notEmpty(),
//     check('lastName', 'Please enter your last name').notEmpty(),
//     check('email', 'Please enter a valid email').isEmail(),
//   ],
// async (req, res) => {
// Check Sent data scope and certainty.
// const errors = validationResult(req);

// Check if errors not empty
// if (!errors.isEmpty()) {
//   return res.status(400).send(errors.array());
// }

// Get Customer Details from client side
// const { firstName, lastName, email, address, phone } = req.body;
// const name = `${firstName} ${lastName}`;

// try {
//   const customer = await stripe.customers.create({
//     name,
//     email,
//     phone,
//     address: {
//       line1: address,
//     },
//     description: 'Create a Customer',
//   });

// Get Newly Created Stripe Customer Details
//       res.json({ customer });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send('Server Failed to Respond!');
//     }
//   }
// );

// module.exports = router;

/*
 **
 **
 **
 */
/**************************************************/
/*********** EXTRA ROUTES ***********/

// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// May be Later
// app.use('/api/reset_password', require('./routes/passwords.js'));
// Get Mentors Page Information from MongoDB Database
// app.use('/api/mentors-page-info', require('./routes/mentorsPageDb.js'));
