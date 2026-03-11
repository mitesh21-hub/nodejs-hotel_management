"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../middleware/auth");
var bookingValidator_1 = require("../validator/bookingValidator");
var bookingsRoute = (0, express_1.Router)();
var bookingsController_1 = require("../controllers/bookingsController");
bookingsRoute.get("/all", bookingsController_1.getListOfBookings);
bookingsRoute.get("/search");
bookingsRoute.get("/myBookings", auth_1.verifyToken, bookingsController_1.myBookings);
bookingsRoute.get("/:id");
bookingsRoute.delete("/delete/:id");
bookingsRoute.put("/update/:id");
bookingsRoute.post("/add/:id/:id", bookingValidator_1.bookingValidation, bookingsController_1.createBooking);
exports.default = bookingsRoute;
//# sourceMappingURL=bookingRoutes.js.map