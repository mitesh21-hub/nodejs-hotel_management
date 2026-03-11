import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { registerValidation } from "../validator/userValidator";
import { loginValidation } from "../validator/userValidator";
// import { taskScheduler } from "../crone/crone";

const authRoute = Router();

import {
    registerUser,
    loginUser,
    myDetails,
    // getMails,
    // contactUs
} from "../controllers/authController"

authRoute.post("/register", registerValidation, registerUser);
authRoute.post("/login", loginValidation, loginUser);
// authRoute.post("/contact", contactUs);
// authRoute.get("/emails", getMails);
authRoute.get("/mydetails", verifyToken, myDetails);

export default authRoute;