// const { compareSync } = require("bcryptjs");
const Models = require("../../models");
const apiResponse = require("../../services/apiResponse.js");
// const Sequelize = require("sequelize");
// const { sequelize } = require("../../models");
// const Op = Sequelize.Op;

module.exports = {
  /**
   * @description this function for the list of hotels.
   * @param req
   * @param res
   */
  getListOfHotels: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit || 3;
      const offset = page ? (page - 1) * limit : 0;
      const data = await Models.Hotels.findAll({
        offset: offset,
        limit: limit,
      });
      return apiResponse.successResponseData(res, data);
    } catch (e) {
      return apiResponse.errorResponseData(res, e);
    }
  },

  /**
   * @description this function for search hotels.
   * @param req
   * @param res
   */
  // hotelSearch: async (req, res) => {
  //   // try {
  //   //   const page = req.query.page;
  //   //   const limit = req.query.limit || 3;
  //   //   const offset = page ? (page-1) * limit : 0;
  //   //   const searchData = {};
  //   //   const { hotel_name, hotel_address, hotel_phone, hotel_amenities } = req.query;
  //   //   if (hotel_name) searchData.hotel_name = {
  //   //     [Op.like]: `%${hotel_name}%`
  //   //   }
  //   //   if (hotel_address) searchData.hotel_address = {
  //   //     [Op.like]: `%${hotel_address}%`
  //   //   }
  //   //   if (hotel_phone) searchData.hotel_phone = {
  //   //     [Op.eq]: hotel_phone
  //   //   }
  //   //   if (hotel_amenities) searchData.hotel_amenities = {
  //   //     [Op.like]: `%${hotel_amenities}%`
  //   //   }
  //   //   const data = await Models.Hotels.findAll({
  //   //     offset: offset,
  //   //     limit: limit,
  //   //     where:{
  //   //       ...searchData,
  //   //     }
  //   //   });
  //   //   return apiResponse.successResponseData(res, data);
  //   // } catch (e) {
  //   //   return apiResponse.errorResponseData(res, e);
  //   // }
  // },

  /**
   * @description this function for get hotel from the hotelId.
   * @param req
   * @param res
   */
  getHotelsDataFromId: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const hotel_id = parseInt(req.params.id);
      // const room_id = parseInt(req.params.id);

      const rooms = await Models.Rooms.count({
        where: {
          hotel_id: hotel_id,
        },
      });
      const data = await Models.Hotels.findOne({
        where: {
          id,
        },
      });
      if (!data) {
        return apiResponse.errorResponseWithoutData(res);
      }
      return apiResponse.successResponseData(res, { data, rooms });
    } catch (e) {
      return apiResponse.errorResponseData(res, e);
    }
  },

  /**
   * @description this function to update hotel from the hotelId.
   * @param req
   * @param res
   */
  updateHotel: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = await Models.Hotels.update(req.body, {
        where: {
          id: id,
        },
      });
      return apiResponse.successResponseData(res, data);
    } catch (e) {
      return apiResponse.errorResponseData(res, e);
    }
  },

  /**
   * @description this function for delete particular hotel.
   * @param req
   * @param res
   */
  deleteHotel: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await Models.Hotels.destroy({
        where: {
          id,
        },
      });
      return apiResponse.deleteSuccessResponseData(res);
    } catch (e) {
      return apiResponse.errorResponseWithoutData(res);
    }
  },

  /**
   * @description For the create hotels.
   * @param req
   * @param res
   */
  createHotel: async (req, res) => {
    try {
      const hotel_name = req.body.hotel_name;
      const hotel_address = req.body.hotel_address;
      const hotel_phone = req.body.hotel_phone;
      const hotel_amenities = req.body.hotel_amenities;
      const data = await Models.Hotels.create({
        hotel_name: hotel_name,
        hotel_address: hotel_address,
        hotel_phone: hotel_phone,
        hotel_amenities: hotel_amenities,
      });
      return apiResponse.successResponseData(res, data);
    } catch (e) {
      console.log(e, "e>>>>>>>>>>>>>>");
      return apiResponse.errorResponseData(res);
    }
  },
};
