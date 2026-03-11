"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var hotelValidaor_1 = require("../validator/hotelValidaor");
var hotelsRoute = (0, express_1.Router)();
var hotelsController_1 = require("../controllers/hotelsController");
hotelsRoute.get("/all", hotelsController_1.getListOfHotels);
hotelsRoute.get("/search", hotelsController_1.hotelSearch);
hotelsRoute.get("/:id");
hotelsRoute.delete("/delete/:id");
hotelsRoute.put("/update/:id");
hotelsRoute.post("/add", hotelValidaor_1.hotelValidation, hotelsController_1.createHotel);
exports.default = hotelsRoute;
//# sourceMappingURL=hotelRoutes.js.map