"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var roomValidator_1 = require("../validator/roomValidator");
var roomsRoute = (0, express_1.Router)();
var roomscontroller_1 = require("../controllers/roomscontroller");
roomsRoute.get("/hotel/:id", roomscontroller_1.getListOfRoomsByHotel);
roomsRoute.get("/search", roomscontroller_1.searchRoom);
roomsRoute.get("/:id");
roomsRoute.delete("/delete/:id");
roomsRoute.put("/update/:id");
roomsRoute.post("/add", roomValidator_1.roomValidation, roomscontroller_1.createRoom);
exports.default = roomsRoute;
//# sourceMappingURL=roomRouter.js.map