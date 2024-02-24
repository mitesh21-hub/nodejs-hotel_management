const Models = require("../../models");
const apiResponse = require("../../services/apiResponse.js");
// const Sequelize = require("sequelize");
// const { sequelize } = require("../../models");
// const Op = Sequelize.Op;

module.exports = {
  /**
   * @description this function for the list of bookings.
   * @param req
   * @param res
   */
  getListOfBookings: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit || 3;
      const offset = page ? (page-1) * limit : 0;
      
      const data = await Models.Bookings.findAll({
        offset: offset,
        limit: limit,
        include:[{model:Models.Hotels,
          as: "hotels",
          attributes:["hotel_name", "hotel_amenities"]
        }, 
        {
          model:Models.Rooms,
          as: "rooms",
          attributes: ["room_number", "room_type", "room_amenities", "price"]
        }
      ]
      });

      return apiResponse.successResponseData(res, data);
    } catch (e) {
      return apiResponse.errorResponseData(res, e);
    }
  },

   /**
   * @description this function for searching booking by hotel.
   * @param req
   * @param res
   */
  searchBookingsByHotel: async (req, res) => {
    try { 
      const hotel_name = req.query.hotel_name;
      const data = await Models.Hotels.findOne({  
        where: {
          hotel_name:hotel_name,
        },
        attributes: ["hotel_name"],
        include:[{model:Models.Bookings,
          as: "booking",
        },
        {
          model:Models.Rooms,
          as: "rooms",
          attributes: ["room_number"]
        }
      ]
      });
      return apiResponse.successResponseData(res, data);
    } catch (e) {
      return apiResponse.errorResponseData(res, e);
    }
  },

  /**
   * @description this function for get user from the bookingId.
   * @param req
   * @param res
   */
  getBookingDataFromId: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = await Models.Bookings.findOne({
        where: {
          id,
        },
        include:[{model:Models.Hotels,
          as: "hotels",
          attributes:["hotel_name", "hotel_amenities"]
        }, 
        {
          model:Models.Rooms,
          as: "rooms",
          attributes: ["room_number", "room_type", "room_amenities"]
        }
      ]
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
   * @description this function to update booking from the bookingId.
   * @param req
   * @param res
   */
  updateBooking: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = await Models.Bookings.update(req.body, {
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
   * @description this function for delete particular booking.
   * @param req
   * @param res
   */
  deleteBooking: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await Models.Bookings.destroy({
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
   * @description For the create booking.
   * @param req
   * @param res
   */
  createBooking: async (req, res) => {
    try {
      const booking_date = new Date();
      const { check_in, check_out, room_id, user_id, hotel_id } = req.body;
        const hotelData = await Models.Hotels.findOne({  
          where: {
            id:hotel_id,
          },
          attributes: ["hotel_name"],
        });
        const roomData = await Models.Rooms.findOne({  
          where: {
            id:room_id,
          },
          attributes: ["room_number"],
        });
  
        const isBookingExists = await Models.Bookings.findOne({
        where: {
          room_id,
          hotel_id,
        }
      });
      if (isBookingExists && new Date(check_out)>new Date(check_in)) {
        return apiResponse.successResponseWithoutData(
          res,
          "booking already exist"
          );
        }
        let randomstr = Math.floor(
          Math.random()*10000);
  
        const bookingNumber = `${hotelData.hotel_name.substring(0,3)}-${roomData.room_number}-${randomstr}`;
 
      const data = await Models.Bookings.create({
        booking_number:bookingNumber,
        booking_date: booking_date,
        check_in: check_in,
        check_out: check_out,
        room_id: room_id,
        user_id: user_id,
        hotel_id: hotel_id,
      });
      return apiResponse.successResponseData(res, data);
    } catch (e) {
      console.log(e, "e>>>>>>>>>>>>");
      return apiResponse.errorResponseData(res);
    }
  }
};
