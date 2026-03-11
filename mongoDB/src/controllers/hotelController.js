const Hotel = require("../models/hotels");

module.exports = {
  /**
   * @description this function for the list of hotels.
   * @param req
   * @param res
   */
  getListOfHotels: async (req, res) => {
    try {
      const data = await Hotel.find({}).skip(0).limit(2);
      res.send({ data });
      console.log(data, "data>>>>>");
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @description this function for adding hotels.
   * @param req
   * @param res
   */
  createHotel: async (req, res) => {
    try {
      const { hotel_name, hotel_address, hotel_phone, hotel_amenities } =
        req.body;
      const data = await Hotel.insertMany({
        hotel_name,
        hotel_address,
        hotel_phone,
        hotel_amenities,
      });
      res.send({ data });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @description this function for hotels by id.
   * @param req
   * @param res
   */
  getHotelsDataFromId: async (req, res) => {
    try {
      const hotel_id = req.params.id;
      const data = await Hotel.findById(hotel_id);
      res.send({ data });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @description this function for the updating of hotels.
   * @param req
   * @param res
   */
  updateHotel: async (req, res) => {
    try {
        const hotel_id = req.params.id;
        const { hotel_name, hotel_address, hotel_phone, hotel_amenities } =
        req.body;
        const data = await Hotel.findByIdAndUpdate(hotel_id, req.body)
        res.send({data})
    } catch (error) {
        console.log(error);
    }
  },


  /**
   * @description this function for deleting hotel by id.
   * @param req
   * @param res
   */
  deleteHotel: async (req, res) => {
    try {
        const hotel_id = req.params.id;
        const data = await Hotel.findByIdAndDelete(hotel_id)
        res.status(200).send(`Document with ${data.hotel_name} has been deleted`)
    } catch (error) {
        console.log(error);
    }
  },

  hotelSearch: async (req, res) => {
    try {
      
      const { hotel_name, hotel_address, hotel_phone, hotel_amenities } = req.query;
      
        const data = await Hotel.find({$or:[{hotel_name:{$regex:'.*' + hotel_name + '.*', '$options' : 'i'}}, {hotel_address:{$regex:'.*' + hotel_address + '.*', '$options' : 'i'}}, {hotel_phone:{$regex:'.*' + hotel_phone + '.*', '$options' : 'i'}}, {hotel_amenities: {$in:[hotel_amenities]}}]});

        // {hotel_amenities: {$in:[hotel_amenities]},

        console.log(data,"data");
        res.send({data})
    } catch (error) {
      console.log(error);
    }
  }

};
