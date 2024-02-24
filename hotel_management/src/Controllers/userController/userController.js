// const Models = require("../../models");
// const apiResponse = require("../../services/apiResponse.js");

// module.exports = {
//   /**
//    * @description this function for the list of users.
//    * @param req
//    * @param res
//    */

//   getListOfUsers: async (req, res) => {
//     try {
//       const data = await Models.Users.findAll({});
//       return apiResponse.successResponseData(res, data);
//     } catch (e) {
//       return apiResponse.errorResponseData(res, e);
//     }
//   },

//   /**
//    * @description this function for the users details from id.
//    * @param req
//    * @param res
//    */

//   getUserDataFromId: async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       const data = await Models.Users.findOne({
//         where: {
//           id,
//         },
//       });
//       if (!data) {
//         return apiResponse.errorResponseWithoutData(res);
//       }
//       return apiResponse.successResponseData(res, data);
//     } catch (e) {
//       return apiResponse.errorResponseData(res, e);
//     }
//   },

//   /**
//    * @description this function to update user from the userId.
//    * @param req
//    * @param res
//    */
//   updateUser: async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       const data = await Models.Users.update(req.body, {
//         where: {
//           id: id,
//         },
//       });
//       return apiResponse.successResponseData(res, data);
//     } catch (e) {
//       return apiResponse.errorResponseData(res, e);
//     }
//   },

//   /**
//    * @description this function for delete particular user.
//    * @param req
//    * @param res
//    */

//   deleteUser: async (req, res) => {
//     try {
//       const id = parseInt(req.params.id);
//       await Models.Users.destroy({
//         where: {
//           id,
//         },
//       });
//       return apiResponse.deleteSuccessResponseData(res);
//     } catch (e) {
//       return apiResponse.errorResponseWithoutData(res);
//     }
//   },

//   /**
//    * @description For create users.
//    * @param req
//    * @param res
//    */

//   createUser: async (req, res) => {
//     try {
//       const user_name = req.body.user_name;
//       const user_email = req.body.user_email;
//       const user_phone = req.body.user_phone;
//       const user_age = req.body.user_age;
//       const user_gender = req.body.user_gender;
//       const user_password = req.body.user_password;
//       const user_IDProof = req.body.user_IDProof;
//       const data = await Models.Users.create({
//         user_name: user_name,
//         user_email: user_email,
//         user_phone: user_phone,
//         user_age: user_age,
//         user_gender: user_gender,
//         user_password: user_password,
//         user_IDProof: user_IDProof,
//       });
//       return apiResponse.successResponseData(res, data);
//     } catch (e) {
//       return apiResponse.errorResponseData(res);
//     }
//   },
// };
