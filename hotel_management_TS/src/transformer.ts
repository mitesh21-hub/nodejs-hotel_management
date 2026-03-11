import { Hotels } from "./entity/Hotels";
import { Bookings } from "./entity/Bookings";
import "reflect-metadata";
import { Request, Response } from "express";
import { getManager } from "typeorm";
import { room_type } from './entity/Rooms';
const transformer  = require("object-transformer");
const { hotelschema, roomSchema, bookingSchema } = require("./schema/hotelSchema.js")

export const transformerData = async (req:Request, res:Response) => {    
    let list = new transformer.List(hotelschema, roomSchema, bookingSchema,{
        id: "bookingId",
        booking_number: "booking_number",
        booking_date: "booking_date",
        check_in: "check_in",
        check_out: "check_out",
        hotel_name:"hotel_name",
        hotel_amenities:"hotel_amenities",
        room_number:"room_number",
        room_type:"room_type",
        room_amenities:"room_amenities",

    }).parse()
    console.log("transform data", list);
}
