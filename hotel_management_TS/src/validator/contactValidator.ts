import * as Joi from 'joi';
import * as express from 'express';
import { Request, Response, NextFunction } from "express";
const apiResponse = require("../services/apiResponse.js");

export const contactValidation = async (req: Request, res: Response, next: NextFunction) => {

    const contactSchema =
        Joi.object({
            name: Joi.string().required(),
            phone: Joi.string().min(10).required(),
            subject: Joi.string().valid("Inquiry", "Booking", "Cancellation", "Refund", "General").required(),
            message: Joi.string().required(),
            // file: Joi.string().required()
        });

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = contactSchema.validate(req.body, options);

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
