const Booking = require("../models/bookings");
const Hotel = require("../models/hotels");
const Rooms = require("../models/rooms");
const User = require("../models/users");
const apiResponse = require("../services/apiResponse");

module.exports = {
  /**
   * @description this function for the list of bookings.
   * @param req
   * @param res
   */
  getListOfBookings: async (req, res) => {
    try {
      const data = await Booking.find({}).skip(0).limit(2);
      res.send({ data });
    } catch (error) {
      console.log(error);
    }
  },

  getBookingDataFromId: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Booking.findById(id);
      res.send({ data });
    } catch (error) {
      console.log(error);
    }
  },

  updateBooking: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        booking_number,
        booking_date,
        check_in,
        check_out,
        room_id,
        user_id,
        hotel_id,
      } = req.body;

      const data = await Booking.findByIdAndUpdate(id, req.body);
      res.send({ data });
    } catch (error) {
      console.log(error);
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Booking.findByIdAndDelete(id);
      res.send({
        message: "document deleted",
      });
    } catch (error) {
      console.log(error);
    }
  },

  createBooking: async (req, res) => {
    try {
      const booking_date = new Date();
      const room_id = req.params.id;
      const hotel_id = req.params.id;
      const { check_in, check_out, user_id } = req.body;

      const hotelData = await Hotel.findOne({ hotel_id }, { hotel_name: 1 });
      console.log("hoteldata>", hotelData);

      const roomData = await Rooms.findOne({ room_id }, { room_number: 1 });
      console.log("roomdata>", roomData);

      const isBookingexist = await Booking.findOne({ hotel_id, room_id });
      if (isBookingexist && new Date(check_out) > new Date(check_in)) {
        return apiResponse.successResponseWithoutData(
          res,
          "booking already exist"
        );
      }

      let randomstr = Math.floor(Math.random() * 10000);

      const bookingNumber = `${hotelData.hotel_name.substring(0, 3)}-${
        roomData.room_number
      }-${randomstr}`;

      const data = await Booking.create({
        booking_number: bookingNumber,
        booking_date: booking_date,
        check_in: check_in,
        check_out: check_out,
        room_id: room_id,
        user_id: user_id,
        hotel_id: hotel_id,
      });
      return apiResponse.successResponseData(res, data);
    } catch (error) {
      console.log(error);
    }
  },

  details: async (req, res) => {
    // try {
    //   const data = await Booking.findOne(req.user);
    //   console.log(data);
    //   return apiResponse.successResponseData(res, data);
    // } catch (error) {
    //   console.log(error);
    // }
  },
};
