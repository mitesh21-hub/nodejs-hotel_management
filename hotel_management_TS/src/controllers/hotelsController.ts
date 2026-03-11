import "reflect-metadata"
import { Request, Response } from "express";
import { Hotels } from '../entity/Hotels';
import { getManager, createQueryBuilder } from 'typeorm';
const apiResponse = require("../services/apiResponse.js");

export const createHotel = async (req: Request, res: Response) => {
   
   try {
    const entityManager = getManager();
    const { hotel_name, hotel_address, hotel_phone, hotel_amenities } = req.body;
    let data = await entityManager.insert(Hotels, {
        hotel_name: hotel_name, hotel_address: hotel_address, hotel_phone: hotel_phone, hotel_amenities: hotel_amenities
    })
    return apiResponse.successResponseData(res, data);
   } catch (error) {
    return apiResponse.errorResponseData(res, error)
   }
    
}

export const getListOfHotels = async (req: Request, res: Response) => {

    try {
        const entityManager = getManager();
        const page: number = parseInt(req.query.page as any) || 1;
        const take = 2;
        const data = await entityManager.find(Hotels, {
            take,
            skip: (page - 1) * take
        });
        return apiResponse.successResponseData(res, data);
    } catch (error) {
        return apiResponse.errorResponseData(res, error)
    }

}

export const hotelSearch = async (req: Request, res: Response, args: any) => {
    try {
        const entityManager = getManager();
        const searchData: Object = {}
        const { hotel_name, hotel_address, hotel_phone, hotel_amenities } = req.query;

        const data = await entityManager.createQueryBuilder(Hotels, "hotels").where("hotels.hotel_name like :name", { name: `%${hotel_name}%` }).orWhere("hotels.hotel_address like :address", { address: `%${hotel_address}%` }).orWhere("hotels.hotel_phone like :phone", { phone: `%${hotel_phone}%` }).orWhere("hotels.hotel_amenities like :amenities", { amenities: `%${hotel_amenities}%` })
            .getMany()
        return apiResponse.successResponseData(res, data);
    } catch (error) {
        return apiResponse.errorResponseData(res, error)
    }

}