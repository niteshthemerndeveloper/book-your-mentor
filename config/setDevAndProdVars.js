const config = require('config');

const setDevAndProdVars = () => {
  let configVars = {};

  if (process.env.NODE_ENV === 'production') {
    // Set Config Vars in Production
    configVars.mongoDBURISecretKey = process.env.mongoDBURISecretKey;
    configVars.jwtTokenSecretKey = process.env.jwtTokenSecretKey;
    configVars.stripeSecretKey = process.env.stripeSecretKey;
  } else {
    // Set Config Vars in Development
    configVars.mongoDBURISecretKey = config.get('mongoDBURISecretKey');
    configVars.jwtTokenSecretKey = config.get('jwtTokenSecretKey');
    configVars.stripeSecretKey = config.get('stripeSecretKey');
  }

  return configVars;
};

// setDevAndProdVars();

module.exports = setDevAndProdVars;
