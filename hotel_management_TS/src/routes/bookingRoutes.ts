import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { bookingValidation } from "../validator/bookingValidator";
const bookingsRoute = Router();
import {
    getListOfBookings,
    // hotelSearch,
    // getHotelsDataFromId,
    // updateHotel,
    createBooking,
    myBookings
    // deleteHotel,
} from "../controllers/bookingsController";


bookingsRoute.get("/all", getListOfBookings);
bookingsRoute.get("/search",);
bookingsRoute.get("/myBookings", verifyToken, myBookings);
bookingsRoute.get("/:id",);
bookingsRoute.delete("/delete/:id",);
bookingsRoute.put("/update/:id",);
bookingsRoute.post("/add/:id/:id", bookingValidation, createBooking);

export default bookingsRoute;
