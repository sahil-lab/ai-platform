const crypto = require('crypto');

const configService = {
  generateJwtSecret: () => {
    // Generate a random secret for each user
    return crypto.randomBytes(32).toString('hex');
  },
};

module.exports = configService;
