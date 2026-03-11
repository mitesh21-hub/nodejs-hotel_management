const Rooms = require("../models/rooms");
const Booking = require("../models/bookings");
const Hotel = require("../models/hotels");

module.exports = {
  /**
   * @description this function for the list of rooms.
   * @param req
   * @param res
   */
  getListOfRoomsByHotel: async (req, res) => {
    const bookedRoomArr = [];
    const hotel_id = req.params.id;

    const bookingData = await Booking.findOne({hotel_id});
    console.log(bookingData, "booking data");
    // Array(bookingData).forEach((element) => {
    //   bookedRoomArr.push(
    //     element.room_id,
    //     element.check_in,
    //     element.check_out
    //   );
    // });
    // console.log(bookedRoomArr, "array");

    const hotelData = await Hotel.findOne({hotel_id}, {"hotel_name":1});
    console.log("hotelData", hotelData);

    const data = await Rooms.find({hotel_id});
    console.log(data,"data>>>>>>");
    res.send({data})

  },

  createRoom: async (req, res) => {
    try {
      const {
        room_number,
        room_type,
        room_desc,
        room_amenities,
        price,
        hotel_id,
      } = req.body;

      const data = await Rooms.insertMany({
        room_number,
        room_type,
        room_desc,
        room_amenities,
        price,
        hotel_id,
      });
      res.send({ data });
    } catch (error) {
      console.log(error);
    }
  },

  getRoomDataFromId: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Rooms.findById(id);
      res.send({ data });
    } catch (error) {
      console.log(error);
    }
  },

  updateRoom: async (req, res) => {
    try {
      const {
        room_number,
        room_type,
        room_desc,
        room_amenities,
        price,
        hotel_id,
      } = req.body;
      const id = req.params.id;
      const data = await Rooms.findByIdAndUpdate(id, req.body);
      res.send({ data });
    } catch (error) {
      console.log(error);
    }
  },

  deleteRoom: async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Rooms.findByIdAndDelete(id)
        res.send({
           message: "document deleted"
    })
    } catch (error) {
        console.log(error);
    }
  },

  searchRooms: async (req, res) => {
    try {
      
      const { room_type, room_amenities } = req.query;
      
        const data = await Rooms.find({$or:[{room_type:{$regex:'.*' + room_type + '.*', '$options' : 'i'}}, {room_amenities: {$in:[room_amenities]}}]});

        console.log(data,"data");
        res.send({data})
    } catch (error) {
      console.log(error);
    }
  }

};
