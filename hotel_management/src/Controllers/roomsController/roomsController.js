const Models = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const apiResponse = require("../../services/apiResponse.js");

module.exports = {
  /**
   * @description this function for the list of rooms by hotel.
   * @param req
   * @param res
   */
  getListOfRoomsByHotel: async (req, res) => {
    try {
      const bookedRoomArr = [];
      const id = parseInt(req.params.id);
      const hotel_id = parseInt(req.params.id);
      // const check_in = req.body.check_in;
      // const check_out = req.body.check_out;
      const bookingData = await Models.Bookings.findAll({
        where: {
          hotel_id: hotel_id,
        },
      });
      bookingData.forEach((element) => {
        bookedRoomArr.push(
          element.room_id,
          element.check_in,
          element.check_out
        );
      });
      const hotelData = await Models.Hotels.findOne({
        where: {
          id,
        },
        attributes: ["hotel_name"],
      });
      const data = await Models.Rooms.findAll({
        where: {
          hotel_id: hotel_id,
          id: { [Op.not]: bookedRoomArr },
        },
      });
      return apiResponse.successResponseData(res, { data, hotelData });
    } catch (e) {
      return apiResponse.errorResponseData(res, e);
    }
  },

  /**
   * @description this function for search rooms.
   * @param req
   * @param res
   */
  searchRooms: async (req, res) => {
    try {

      const page = req.query.page;
      const limit = req.query.limit || 3;
      const offset = page ? (page-1) * limit : 0;
      const searchData = {};
      const { room_type, room_amenities } = req.query;
      if (room_type) searchData.room_type = {
        [Op.like]: `%${room_type}%`
      }
      if (room_amenities) searchData.room_amenities = {
        [Op.like]: `%${room_amenities}%`
      }
      const data = await Models.Rooms.findAll({
        offset: offset,
        limit: limit,
        where:{
          ...searchData,
        }
      });
      return apiResponse.successResponseData(res, data);
    } catch (e) {
      return apiResponse.errorResponseData(res, e);
    }
  },

  /**
   * @description this function for get room from the roomId.
   * @param req
   * @param res
   */
  getRoomDataFromId: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = await Models.Rooms.findOne({
        where: {
          id,
        },
      });
      if (!data) {
        return apiResponse.errorResponseWithoutData(res);
      }
      return apiResponse.successResponseData(res, data);
    } catch (e) {
      return apiResponse.errorResponseData(res, e);
    }
  },

  /**
   * @description this function to update room from the roomId.
   * @param req
   * @param res
   */
  updateRoom: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = await Models.Rooms.update(req.body, {
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
   * @description this function for delete particular Room.
   * @param req
   * @param res
   */
  deleteRoom: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await Models.Rooms.destroy({
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
   * @description For the create rooms.
   * @param req
   * @param res
   */
  createRoom: async (req, res) => {
    try {
      const room_number = req.body.room_number;
      const room_type = req.body.room_type;
      const room_desc = req.body.room_desc;
      const room_amenities = req.body.room_amenities;
      const hotel_id = req.body.hotel_id;
      const data = await Models.Rooms.create({
        room_number: room_number,
        room_type: room_type,
        room_desc: room_desc,
        room_amenities: room_amenities,
        hotel_id: hotel_id,
      });
      return apiResponse.successResponseData(res, data);
    } catch (e) {
      return apiResponse.errorResponseData(res);
    }
  },
};
