const Joi = require("joi");

const apiResponse = require("../services/apiResponse.js");

const contactValidation = async (req, res, next) => {

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
    const { error, value } = contactSchema.validate(req.fields, options);

    if (error) {
        const validationMessageKey = (apiTag, error) => {
            let key = (error.details[0].context.key);
            // let type = error.details[0].type.split(".");
            // type = toUpperCase(type[1]);
            // key = apiTag + key + type;
                key = apiTag + key;
            return key;
        };

        return apiResponse.errorResponseData(res, (validationMessageKey("Invalid ", error)));
    }
    return next();
};

module.exports = contactValidation;
