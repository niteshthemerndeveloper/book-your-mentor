const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcryptjs = require('bcryptjs');
const User = require('../models/User.js');
const Password = require('../models/Password.js');
const middlewareAuth = require('../middleware/middlewareAuth.js');
const sendEmail = require('../utils/sendEmail.js');

// test get request

// @route     POST /api/reset_password
// @desc      Verify the Users Email
// @access    Public
let link = '';

router.post(
  '/',
  [check('email', 'Please enter a valid email').isEmail()],
  async (req, res) => {
    // check data scope and certainty
    const errors = validationResult(req);

    // check if errors not empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ msg: 'Email does not exist' });
      }

      // user exists then send token with id
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtTokenSecretKey'),
        {
          expiresIn: 60 * 7,

          // expiresIn: Date.now() + 3600000 - 1 Hour.

          // expiresIn: 60 * 7 - 7 minutes
        },
        async (err, token) => {
          if (err) throw err;
          res.send("Congratulations! we've sent the link to reset password.");
          link = `${config.get('CURRENT_DOMAIN_URL')}/reset_password/${
            user.id
          }/${token}`;
          await sendEmail(user.email, user.name, 'Password Reset', link);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Failed to Respond!');
    }
  }
);

// @route     PUT /api/reset_password/:id
// @desc      Update the users Password
// @access    Private
router.get('/', (req, res) => {
  res.json('Is this working.');
});

module.exports = router;
