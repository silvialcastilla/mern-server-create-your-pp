const jwt = require("../services/jwt");
const moment = require("moment");
const User = require("../models/user");

function checkExpiredToken(token) {
  const { exp } = jwt.decodedToken(token);
  const currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }
  return false;
}

function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;
  const isTokenExpired = willExpireToken(refreshToken);
}

module.exports = {
  refreshAccessToken,
};
