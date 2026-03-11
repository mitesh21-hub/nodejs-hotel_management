import * as Joi from 'joi';
import * as express from 'express';
import { Request, Response, NextFunction } from "express";
const apiResponse = require("../services/apiResponse.js");

export const roomValidation = async (req: Request, res: Response, next: NextFunction) => {

    const roomSchema =
        Joi.object({
            room_number: Joi.number().required(),
            room_type: Joi.string().valid("Single Bed", "Double Bed", "King Size Bed").required(),
            room_desc: Joi.string().min(10).required(),
            room_amenities: Joi.string().required(),
            room_price: Joi.number().required(),
            hotelsId: Joi.number().required()
        });

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = roomSchema.validate(req.body, options);

    if (error) {
        const validationMessageKey = (apiTag: string, error: any) => {
            let key = (error.details[0].context.key);
            // let type = error.details[0].type.split(".");
            // type = toUpperCase(type[1]);
            // key = apiTag + key + type;
            key = apiTag + key;
            return key;
        };

        return apiResponse.errorResponseData(res, (validationMessageKey("Invalid ", error)))
    }
    return next()
}
