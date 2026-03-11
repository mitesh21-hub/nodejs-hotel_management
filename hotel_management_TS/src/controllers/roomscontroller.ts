import "reflect-metadata"
import { Request, Response } from "express";
import { Hotels } from "../entity/Hotels";
import { Rooms, room_type } from '../entity/Rooms';
import { Bookings } from '../entity/Bookings';
import { getManager } from "typeorm";
const apiResponse = require("../services/apiResponse.js");

export const getListOfRoomsByHotel = async (req: Request, res: Response) => {
    try {
        const entityManager = getManager();
    const bookedRoomArr = [];
    const id = parseInt(req.params.id);
    const hotelsId = req.body.hotelsId;
   
    const bookingData: any = await entityManager.createQueryBuilder(Bookings, "bookings").where("bookings.hotelsId=:hotelsId", { hotelsId: id }).getOne();

   Array(bookingData).forEach((element) => {
        bookedRoomArr.push(element.roomsId, element.check_in, element.check_out)
    });

    let hotelData = await entityManager.createQueryBuilder(Hotels, "hotels").where("hotels.id=:hotelsId", { hotelsId: id }).getOne()

    const data = await entityManager.createQueryBuilder(Rooms, "rooms").where("rooms.hotelsId=:hotelsId", {hotelsId:id}).andWhere(
        "id NOT IN (:id)", {id:bookedRoomArr} 
    ).getOne()

    return apiResponse.successResponseData(res, data);
    } catch (error) {
        return apiResponse.errorResponseData(res, error)
    }
    
}


export const createRoom = async (req: Request, res: Response) => {
    try {
        const entityManager = getManager();
        const { room_number, room_type, room_desc, room_amenities, room_price, hotelsId } = req.body;
        const data = await entityManager.insert(Rooms, {
            room_number: room_number, room_type: room_type, room_desc: room_desc, room_amenities: room_amenities, room_price: room_price, hotelsId: hotelsId
        })

        return apiResponse.successResponseData(res, data);
    } catch (error) {
        return apiResponse.errorResponseData(res, error)
    }
}

export const searchRoom = async (req: Request, res: Response) => {
    try {
        const { room_type, room_amenities } = req.query
        const entityManager = getManager();
        const data = await entityManager.createQueryBuilder(Rooms, "rooms").where("rooms.room_type like :room_type", { room_type: `%${room_type}%` }).orWhere("rooms.room_amenities like :room_amenities", { room_amenities: `%${room_amenities}%` }).getMany()

        return apiResponse.successResponseData(res, data);
    } catch (error) {
        return apiResponse.errorResponseData(res, error)
    }
}