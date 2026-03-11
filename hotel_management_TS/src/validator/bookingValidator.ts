import * as Joi from 'joi';
import * as express from 'express';
import { Request, Response, NextFunction } from "express";
const apiResponse = require("../services/apiResponse.js");

export const bookingValidation = async (req: Request, res: Response, next: NextFunction) => {

    const bookingSchema =
        Joi.object({
            check_in: Joi.date().required(),
            check_out: Joi.date().required(),
            userId: Joi.number().required(),
            hotelsId: Joi.number().required(),
            roomsId: Joi.number().required(),
        });

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = bookingSchema.validate(req.body, options);

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
