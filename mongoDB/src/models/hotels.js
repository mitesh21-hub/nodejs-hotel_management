const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotel_name: {
        required: true,
        type: String
    },
    hotel_address: {
        required: true,
        type: String
    },
    hotel_phone: {
        required: true,
        type: String
    },
    hotel_amenities: {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('Hotel', hotelSchema)