const {
  getListOfBookings,
  getBookingDataFromId,
  searchBookingsByHotel,
  updateBooking,
  createBooking,
  deleteBooking,
} = require("../Controllers/bookingController/bookingController");

const bookingRoute = require("express").Router();

bookingRoute.get("/all", getListOfBookings);
bookingRoute.get("/:id", getBookingDataFromId);
bookingRoute.get("/hotels/search", searchBookingsByHotel);
bookingRoute.delete("/delete/:id", deleteBooking);
bookingRoute.put("/update/:id", updateBooking);
bookingRoute.post("/add", createBooking);

module.exports = bookingRoute;
