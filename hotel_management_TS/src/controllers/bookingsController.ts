import "reflect-metadata"
import { Request, Response } from "express";
import { Hotels } from '../entity/Hotels';
import { Users } from '../entity/Users';
import { getManager } from "typeorm";
import { Bookings } from '../entity/Bookings';
import { getRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Rooms } from '../entity/Rooms';
const apiResponse = require("../services/apiResponse.js");
const { hotelschema, roomSchema, bookingSchema } = require("../schema/hotelSchema.js")
const transformer = require("object-transformer");

export const createBooking = async (req: Request, res: Response) => {
    try {
        const entityManager = getManager();
        const id = parseInt(req.params.id);

        const booking_date: Date = new Date()

        let hotelData = await entityManager.createQueryBuilder(Hotels, "hotels").select("hotels.hotel_name").where("hotels.id=:id", { id: id }).getOne()

        if (!hotelData) {
            return apiResponse.errorResponseWithoutData(res, "No hotel data found")
        }

        let roomData = await entityManager.createQueryBuilder(Rooms, "rooms").select("rooms.room_number").where("rooms.id=:id", { id: id })
            // .andWhere("rooms.hotelsId=:hotelsId", { hotelsId: id })
            .getOne()

        if (!roomData) {
            return apiResponse.errorResponseData(res, "No room data found")
        }

        // if (roomData.hotelsId !== hotelData.id) {
        //     return apiResponse.errorResponseData(res, "No room found in hotel")
        // }

        const { check_in, check_out, userId, roomsId, hotelsId } = req.body;
        const isBookingExist = await entityManager.createQueryBuilder(Bookings, "bookings").where("bookings.hotelsId=:hotelsId", { hotelsId: hotelsId }).andWhere("bookings.roomsId=:roomsId", { roomsId: roomsId }).getOne();
        if (isBookingExist)
        // if (isBookingExist && new Date(check_out) > new Date(check_in))
        {
            return apiResponse.errorResponseData(res, "booking already exist")
        }
        if (check_out < new Date().toString() && check_in < new Date().toString() && check_in > check_out) {
            return apiResponse.errorResponseData(res, "invalid checkin checkout date")
        }

        let randomstr: number = Math.floor(
            Math.random() * 10000);
        const bookingNumber = `${hotelData.hotel_name.substring(0, 3)}-${roomData.room_number}-${randomstr}`;

        let data = await entityManager.insert(Bookings, {
            booking_number: bookingNumber, check_in: check_in, check_out: check_out, userId: userId, roomsId: roomsId, hotelsId: hotelsId
        })

        return apiResponse.successResponseData(res, data);
    } catch (error) {
        return apiResponse.errorResponseData(res, error)
    }

}

export const getListOfBookings = async (req: Request, res: Response) => {
    try {
        const entityManager = getManager();
        const bookingRepository = AppDataSource.getRepository(Bookings)
        const page: number = parseInt(req.query.page as any) || 1;
        const take = 10;

        // let data = await entityManager.find(Bookings, {
        //     take,
        //     skip: (page - 1) * take,
        //     // relations: ["Hotels", "Rooms"]
        //     relations: {
        //         hotels: true,
        //         rooms: true
        //     },
        // });


        const data = await entityManager.createQueryBuilder(Bookings, "bookings")
            .leftJoinAndSelect('bookings.hotels', 'hotels')
            .leftJoinAndSelect('bookings.rooms', 'rooms')
            .take(5).skip(0)
            .getMany();

        let list = new transformer.List(data, {
            id: "id",
            booking_number: "booking_number",
            booking_date: "booking_date",
            check_in: "check_in",
            check_out: "check_out",
            hotel_name: "hotels.hotel_name",
            hotel_amenities: "hotels.hotel_amenities",
            room_number: "rooms.room_number",
            room_type: "rooms.room_type",
            room_amenities: "rooms.room_amenities",

        }).parse()
        return apiResponse.successResponseData(res, list);
    } catch (error) {
        return apiResponse.errorResponseData(res, error)
    }

}

export const myBookings = async (req: Request, res: Response) => {
    try {
        const entityManager = getManager();
        const id: any = res.locals.Users;

        const data = await entityManager.createQueryBuilder(Bookings, "bookings")
            .leftJoinAndSelect('bookings.hotels', 'hotels')
            .leftJoinAndSelect('bookings.rooms', 'rooms')
            .where("bookings.userId=:id", { id: id })
            .take(3).skip(0)
            .getMany();

        let list = new transformer.List(data, {
            id: "id",
            booking_number: "booking_number",
            booking_date: "booking_date",
            check_in: "check_in",
            check_out: "check_out",
            hotel_name: "hotels.hotel_name",
            hotel_amenities: "hotels.hotel_amenities",
            room_number: "rooms.room_number",
            room_type: "rooms.room_type",
            room_amenities: "rooms.room_amenities",

        }).parse()
        return apiResponse.successResponseData(res, list);
    } catch (error) {
        return apiResponse.errorResponseData(res, error)
    }

}
