const {
    getListOfBookings,
    getBookingDataFromId,
    searchBookingsByHotel,
    updateBooking,
    createBooking,
    deleteBooking,
    details
  } = require("../controllers/bookingController");
  
  const bookingRoute = require("express").Router();
  
  bookingRoute.get("/all", getListOfBookings);
  bookingRoute.get("/:id", getBookingDataFromId);
//   bookingRoute.get("/hotels/search", searchBookingsByHotel);
  bookingRoute.delete("/delete/:id", deleteBooking);
  bookingRoute.put("/update/:id", updateBooking);
  bookingRoute.post("/add/:id/:id", createBooking);
  bookingRoute.get("/details", details);
  
  module.exports = bookingRoute;
  