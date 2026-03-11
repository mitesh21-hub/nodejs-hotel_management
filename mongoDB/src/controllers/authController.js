const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var validator = require("validator");
var passwordValidator = require("password-validator");
const apiResponse = require("../services/apiResponse");
const transporter = require("../services/mailer")

module.exports = {
  /**
   * @description this function for the User Registration.
   * @param req
   * @param res
   */
  registerUser: async (req, res) => {
    try {
      const {
        user_name,
        user_email,
        user_phone,
        user_gender,
        user_age,
        user_IDProof,
        user_password,
      } = req.body;
      console.log(req.body);

      if (!validator.isEmail(user_email)) {
        return apiResponse.errorResponseData(
          res,
          "Invalid email id, add valid email address."
        );
      }

      let schema = new passwordValidator();
      schema
        .is()
        .min(8) // Minimum length 8
        .is()
        .max(20) // Maximum length 20
        .has()
        .uppercase() // Must have uppercase letters
        .has()
        .lowercase() // Must have lowercase letters
        .has()
        .digits(3) // Must have at least 3 digits
        .has()
        .not()
        .spaces() // Should not have spaces
        .has()
        .symbols() //Should have symbols
        .is()
        .not()
        .oneOf(["Passw0rd", "Password123"]);
      if (!schema.validate(user_password)) {
        return apiResponse.errorResponseData(
          res,
          "Password should be of minimum 8 and maximum 20 characters and should contain uppercase and lowercase and digits and symbols."
        );
      }

      if (user_phone.length !== 10) {
        return apiResponse.errorResponseData(
          res,
          "Invalid phone number, add valid 10 digit phone number"
        );
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

      if (user_age < 18 && user_age > 100) {
        return apiResponse.errorResponseData(res, "You are not eligible");
      }

      else{
      const oldUser = await User.findOne({ user_email });

      if (oldUser) {
        return apiResponse.successResponseWithoutData(
          res,
          "User already exist"
        );
      }
      
      const encryptedPassword = await bcrypt.hash(user_password, 10);

      const user = await User.create({
        user_name:user_name,
        user_phone:user_phone,
        user_gender:user_gender,
        user_age:user_age,
        user_IDProof:user_IDProof,
        user_email: user_email.toLowerCase(),
        user_password: encryptedPassword,
      })
      const locals = {
        name: user_name
      }
      const pug = require("pug")
      let html = pug.renderFile("src/views/index2.pug", locals)
      
      const mailOptions = {
        from: "mitesh.saresa@mindinventory.com",
        to: user_email,
        subject: "Success Message",
        text: "Registration successful.",
        html: html,
        locals,
        headers: { 'x-myheader': 'test header' },
      }
      
      const info = transporter.sendMail(mailOptions)
      console.log("Message sent: %s", (await info).messageId);
      
      return apiResponse.successResponseData(res, user);
    }
    } catch (error) {}
  },

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
        const user = await User.findOne({ user_email });
  
        if (user && (await bcrypt.compare(user_password, user.user_password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, user_email },
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

    myDetails: async (req, res) => {
        try {
           
           const data = await User.findOne(req.user, {"user_password": 0});
            return apiResponse.successResponseData(res, data);
            
        } catch (error) {
            console.log(error);
        }
    }

}
