const Models = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const apiResponse = require("../../services/apiResponse.js");
var validator = require("validator");
var passwordValidator = require("password-validator");
// const expressSession = require("express-session");

module.exports = {
  /**
   * @description this function for the details of users.
   * @param req
   * @param res
   */
  myDetails: async (req, res) => {
    const id = req.user;
    await Models.Users.findOne({
      where: { id },
    });
      return apiResponse.successResponseData(res, id);
  },

  /**
   * @description this function for the registration of users.
   * @param req
   * @param res
   */
  registerUser: async (req, res) => {
    try {
      // Get user input
      const {
        user_name,
        user_email,
        user_phone,
        user_gender,
        user_age,
        user_IDProof,
        user_password,
      } = req.body;
      // const id = parseInt(req.params.id);
      // Validate user input
      if (!validator.isEmail(user_email)) {
        return apiResponse.errorResponseData(res, "Invalid email id, add valid email address.");
      }

      let schema = new passwordValidator();
      schema
        .is().min(8)                                    // Minimum length 8
        .is().max(20)                                  // Maximum length 20
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(3)                                // Must have at least 3 digits
        .has().not().spaces()                           // Should not have spaces
        .has().symbols()                                //Should have symbols
        .is().not().oneOf(["Passw0rd", "Password123"]);
      if (!schema.validate(user_password)) {
        return apiResponse.errorResponseData(res, "Password should be of minimum 8 and maximum 20 characters and should contain uppercase and lowercase and digits and symbols.");
      }

      if (user_phone.length !== 10) {
        return apiResponse.errorResponseData(res, "Invalid phone number, add valid 10 digit phone number");
      }
      if (
        !(
          user_name &&
          user_email &&
          user_password &&
          user_phone &&
          user_gender &&
          user_age &&
          user_IDProof
        )
      ) {
        return apiResponse.errorResponseData(res);
      }

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await Models.Users.findOne({ where: { user_email } });

      if (oldUser) {
        return apiResponse.successResponseWithoutData(
          res,
          "User already exist"
        );
      }
      
      //Encrypt user password
      const encryptedPassword = await bcrypt.hash(user_password, 10);

      // Create user in our database
      const user = await Models.Users.create({
        user_name,
        user_phone,
        user_gender,
        user_age,
        user_IDProof,
        user_email: user_email.toLowerCase(),
        user_password: encryptedPassword,
      });
      return apiResponse.successResponseData(res, user);
    } catch (err) {
      console.log("err", err);
      return apiResponse.errorResponseData(res, err);
    }
  },

  /**
   * @description this function for the login users.
   * @param req
   * @param res
   */
  loginUser: async (req, res) => {
    try {
      // Get user input
      const { user_email, user_password } = req.body;
      // const id = parseInt(req.params.id);
      // Validate user input

      if (!(user_email && user_password)) {
        return apiResponse.errorResponseData(res);
      }
      // Validate if user exist in our database
      const user = await Models.Users.findOne({ where: { user_email } });

      if (user && (await bcrypt.compare(user_password, user.user_password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user.id, user_email },
          process.env.TOKEN_KEY,
          {
            expiresIn: 864000,
          }
        );

        // save user token
        user.token = token;

        // user
        return apiResponse.successResponseData(res, { token: token });
      }

      return apiResponse.errorResponseData(res, "invalid credentials");
    } catch (err) {
      console.log(err);
    }
  },
};