import { Router } from "express";
import { hotelValidation } from "../validator/hotelValidaor";
const hotelsRoute = Router();
import {
  getListOfHotels,
  hotelSearch,
  // getHotelsDataFromId,
  // updateHotel,
  createHotel,
  // deleteHotel,
} from "../controllers/hotelsController";


hotelsRoute.get("/all", getListOfHotels);
hotelsRoute.get("/search", hotelSearch);
hotelsRoute.get("/:id",);
hotelsRoute.delete("/delete/:id",);
hotelsRoute.put("/update/:id",);
hotelsRoute.post("/add", hotelValidation, createHotel);

export default hotelsRoute;
