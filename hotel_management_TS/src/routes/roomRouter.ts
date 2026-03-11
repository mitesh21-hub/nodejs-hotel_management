import { Router } from "express";
import { roomValidation } from "../validator/roomValidator";
const roomsRoute = Router();
import {

    getListOfRoomsByHotel,
    createRoom,
    searchRoom

} from "../controllers/roomscontroller";


roomsRoute.get("/hotel/:id", getListOfRoomsByHotel);
roomsRoute.get("/search", searchRoom);
roomsRoute.get("/:id",);
roomsRoute.delete("/delete/:id",);
roomsRoute.put("/update/:id",);
roomsRoute.post("/add", roomValidation, createRoom);

export default roomsRoute;
