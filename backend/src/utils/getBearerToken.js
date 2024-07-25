const jwt = require('jsonwebtoken');
const config = require('../config/config');

const getUserFromBearerToken = (req) => {
  const authTokenHeader = req.get('Authorization');
  let userId;
  jwt.verify(authTokenHeader.split(' ')[1], config.jwt.secret, (err, decoded) => {
    if (err) throw err;
    userId = decoded.sub;
  });
  return userId;
};

module.exports = getUserFromBearerToken;
