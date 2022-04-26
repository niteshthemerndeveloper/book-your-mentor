const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const middlewareAuth = require('../middleware/middlewareAuth.js');

const setDevAndProdVars = require('../config/setDevAndProdVars.js');

const configVars = setDevAndProdVars();

const { jwtTokenSecretKey } = configVars;

// @route     GET api/login
// @desc      Get the Logged in User
// @access    Private
router.get('/', middlewareAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).send('Server Failed to Respond!');
  }
});

// @route     POST api/login
// @desc      Verify & Login a User
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check if errors not empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    let { email, password } = req.body;

    try {
      // Check users details
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ msg: 'Invalid Credentials!' });
      }

      // if exist then Check users password
      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ msg: 'Invalid Credentials!' });
      }

      // user verified -> send jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        jwtTokenSecretKey,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Failed to Respond!');
    }
  }
);

// @route     PUT api/login/:id
// @desc      Verify & Login a User
// @access    Private
router.put(
  '/:id',
  [
    middlewareAuth,
    [
      check('email', 'Please enter a valid email').isEmail(),
      check('password', 'Please enter a valid password').exists(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check if errors not empty
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    // Find If the User already Logged In
    let user = await User.findById(req.params.id);
    const { name, email, password } = req.body;

    const userFields = {};

    if (name) userFields.name = name;
    if (email) userFields.email = email;
    if (password) userFields.password = password;

    try {
      if (!user) {
        return res
          .status(401)
          .json({ msg: 'Invalid Credentials! Please login again' });
      }

      // if exist then Check users password
      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(401)
          .json({ msg: 'Invalid Credentials! Please login again' });
      }

      // Hash the users Password
      const salt = await bcryptjs.genSalt(10);

      userFields.password = await bcryptjs.hash(password, salt);

      // Update the User Credentials
      user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: userFields },
        { new: true }
      );

      user = await User.findById(user.id).select('-password');

      res.json({ user, msg: 'User updated successfully' });
      // res.json({ msg: 'User updated successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Failed to Respond!');
    }
  }
);

module.exports = router;
