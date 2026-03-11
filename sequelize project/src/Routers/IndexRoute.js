const IndexRoute = require("express").Router();
const contactRoute = require("./contactRouter");
const HotelRoute = require("./HotelRouter");
const HotelRoomsRoute = require("./HotelRoomsRouter");
const BookingRoute = require("./BookingRouter");
const authRoute = require("./authRouter");
// const authenticationRoute = require("./authenticationRouter");

IndexRoute.use("/api/v1/user", authRoute);
// IndexRoute.use("/api/v1/authenticate/user", authenticationRoute);
// IndexRoute.use("/api/v1/users", UserRoute);
IndexRoute.use("/api/v1/hotels", HotelRoute);
IndexRoute.use("/api/v1/rooms", HotelRoomsRoute);
IndexRoute.use("/api/v1/bookings", BookingRoute);
IndexRoute.use("/api/v1/contact", contactRoute);

module.exports = IndexRoute;
