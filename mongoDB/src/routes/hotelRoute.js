const {
  getListOfHotels,
  hotelSearch,
  getHotelsDataFromId,
  updateHotel,
  createHotel,
  deleteHotel,
} = require("../controllers/hotelController");
const express = require("express");
const hotelsRoute = express.Router();

// hotelRoute.get("/all", getListOfHotels);
hotelsRoute.get("/all", getListOfHotels);
hotelsRoute.get("/search", hotelSearch);
hotelsRoute.get("/:id", getHotelsDataFromId);
hotelsRoute.delete("/delete/:id", deleteHotel);
hotelsRoute.put("/update/:id", updateHotel);
hotelsRoute.post("/add", createHotel);

module.exports = hotelsRoute;
