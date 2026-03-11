import { Router } from "express";
const IndexRoute = Router();
import * as express from "express";
const app: express.Application = express();

// const UserRoute = require("./UserRouter");
// const authenticationRoute = require("./authenticationRouter");
import hotelsRoute from "./hotelRoutes";
// const HotelRoomsRoute = require("./HotelRoomsRouter");
import roomRoute from "./roomRouter"
import bookingRoute from "./bookingRoutes";
import contactRoute from './contactRoutes';
// const BookingRoute = require("./BookingRouter");

// IndexRoute.use("/api/v1/user", authRoute);
// IndexRoute.use("/api/v1/authenticate/user", authenticationRoute);
IndexRoute.use("/api/v1/hotels", hotelsRoute);
IndexRoute.use("/api/v1/rooms", roomRoute);
IndexRoute.use("/api/v1/bookings", bookingRoute);
IndexRoute.use("/api/v1/contact", contactRoute);

export default IndexRoute;
