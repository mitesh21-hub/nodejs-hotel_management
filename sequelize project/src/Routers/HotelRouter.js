const {
  getListOfHotels,
  // hotelSearch,
  getHotelsDataFromId,
  updateHotel,
  createHotel,
  deleteHotel,
} = require("../Controllers/hotelsController/hotelsController");

const hotelsRoute = require("express").Router();

hotelsRoute.get("/all", getListOfHotels);
// hotelsRoute.get("/search", hotelSearch);
hotelsRoute.get("/:id", getHotelsDataFromId);
hotelsRoute.delete("/delete/:id", deleteHotel);
hotelsRoute.put("/update/:id", updateHotel);
hotelsRoute.post("/add", createHotel);

module.exports = hotelsRoute;
