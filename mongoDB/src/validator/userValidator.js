const Joi = require('joi');
const apiResponse = require("../services/apiResponse.js");

module.exports = {
registerValidation: async (req, res, next) => {
  const { body } = req

  const userSchema =
    // {
    // userSchema:
    Joi.object({
      user_name: Joi.string().required(),
      user_email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }).required(),
      user_phone: Joi.string().min(10).required(),
      user_age: Joi.number().min(18).max(100).required(),
      user_gender: Joi.string().valid("Male", "Female", "Other").required(),
      user_password: Joi.string()
        .pattern(
          new RegExp(
            /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,20}$/
          )
        ).message("Password should be of minimum 8 and maximum 20 characters and should contain uppercase and lowercase and digits and symbols.")
        .required(),
      user_IDProof: Joi.string()
        .valid("Adhar_ID", "Voter_ID", "Licence")
        .required(),
    });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };
  const { error, value } = userSchema.validate(req.body, options);

  if (error) {
    const validationMessageKey = (apiTag, error) => {
      let key = (error.details[0].context.key);
      // let type = error.details[0].type.split(".");
      // type = toUpperCase(type[1]);
      // key = apiTag + key + type;
      key = apiTag + key;
      return key;
    };
    return apiResponse.errorResponseData(res, (validationMessageKey("Invalid ", error)))
  }
  // return callback(true);
  return next()
},

loginValidation: async (req, res, next) => {
  const schema = Joi.object({
    user_email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }).required(),
    user_password: Joi.string()
      .pattern(
        new RegExp(
          /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,20}$/
        )
      )
  })

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    const validationMessageKey = (apiTag, error) => {
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

}
