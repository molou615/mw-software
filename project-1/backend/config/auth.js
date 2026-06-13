const config = require('../config');

module.exports = {
  jwtSecret: config.jwtSecret,
  jwtExpiresIn: config.jwtExpiresIn,
};
