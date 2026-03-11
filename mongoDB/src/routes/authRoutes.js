const verifyToken = require("../middleware/auth");
const registerValidation = require("../validator/userValidator")

const {
  registerUser,
  loginUser,
  myDetails,
} = require("../controllers/authController");
const authRoute = require("express").Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", loginUser);
authRoute.get("/mydetails", verifyToken, myDetails);

module.exports = authRoute;
