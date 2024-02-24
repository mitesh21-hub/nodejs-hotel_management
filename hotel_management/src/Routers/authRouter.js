const verifyToken = require("../Middlewares/authentication/auth");

const {
  registerUser,
  loginUser,
  myDetails,
} = require("../Controllers/authController/authController");
const authRoute = require("express").Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", loginUser);
authRoute.get("/mydetails", verifyToken, myDetails);

module.exports = authRoute;
