const {
  // searchRooms,
  getListOfRoomsByHotel,
  getRoomDataFromId,
  updateRoom,
  createRoom,
  deleteRoom,
} = require("../Controllers/roomsController/roomsController");

const roomsRoute = require("express").Router();

// roomsRoute.get("/search", searchRooms);
roomsRoute.get("/hotel/:id", getListOfRoomsByHotel);
roomsRoute.get("/:id", getRoomDataFromId);
roomsRoute.delete("/delete/:id", deleteRoom);
roomsRoute.put("/update/:id", updateRoom);
roomsRoute.post("/add", createRoom);
module.exports = roomsRoute;
