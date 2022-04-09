const mongoose = require('mongoose');
const setDevAndProdVars = require('./setDevAndProdVars.js');

const configVars = setDevAndProdVars();

const { mongoDBURISecretKey } = configVars;

// Connect to MongoDB Atlas Cloud database
const connectCloudMongoDB = async () => {
  try {
    await mongoose.connect(mongoDBURISecretKey);
  } catch (err) {
    console.log(err.message);
    // Exit Process with failure;
    process.exit(1);
  }
};

module.exports = connectCloudMongoDB;
