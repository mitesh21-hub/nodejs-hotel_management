"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var userValidator_1 = require("../validator/userValidator");
var userValidator_2 = require("../validator/userValidator");
// import { taskScheduler } from "../crone/crone";
var authRoute = (0, express_1.Router)();
var authController_1 = require("../controllers/authController");
authRoute.post("/register", userValidator_1.registerValidation, authController_1.registerUser);
authRoute.post("/login", userValidator_2.loginValidation, authController_1.loginUser);
// authRoute.post("/contact", contactUs);
// authRoute.get("/emails", getMails);
authRoute.get("/mydetails", auth_1.verifyToken, authController_1.myDetails);
exports.default = authRoute;
//# sourceMappingURL=authRoutes.js.map