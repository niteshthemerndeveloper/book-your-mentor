// Mymenty, MentorZone, ConnectCoach, easyMentor,

// Basic Server Setup and requirements
const express = require('express');
const app = express();
const cors = require('cors');

const connectCloudMongoDB = require('./config/mongoCloudDb.js');

// Connect To MongoDB -> To Save Customer in the MongoDB
connectCloudMongoDB();

// Initialize Express Middleware to parse received Data
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes;
// Register a New User & Save Details in the MongoDB Database
app.use('/api/register', require('./routes/registerUser.js'));

// Verify User Credentials & Also Allow Update User Details in the MongoDB Database
app.use('/api/login', require('./routes/verifyLoginUser.js'));

// Add and Get Orders into the MongoDB Database
app.use('/api/orders', require('./routes/orders.js'));

// Allow User to Pay through Stripe Checkout Option
app.use(
  '/api/proceed-to-checkout',
  require('./routes/stripeCheckoutSession.js')
);

app.use(express.static('client/build'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 3295;

app.listen(PORT, () => console.log(`Server Started on the PORT ${PORT}`));
