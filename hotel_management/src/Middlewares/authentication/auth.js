const jwt = require("jsonwebtoken");
const apiResponse = require("../../services/apiResponse.js");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return apiResponse.forbiddenErrorResponseWithoutData(
      res,
      "Token is required for authentication"
    );
  }

  jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return apiResponse.errorResponseData(res, "Invalid token");
    }
    req.user = decoded.user_id;
    next();
  });
};

module.exports = verifyToken;
