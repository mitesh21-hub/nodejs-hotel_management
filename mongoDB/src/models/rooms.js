const { ObjectId } = require('mongodb');
const { Number } = require('mongoose');
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room_number: {
        required: true,
        type: Number
    },
    room_type: {
        required: true,
        type: String,
        enum: ["Single Bed", "Double Bed", "King Size Bed"]
    },
    room_desc: {
        required: true,
        type: String
    },
    room_amenities: {
        required: true,
        type: Array
    },
    price: {
        required: true,
        type: String
    },
    hotel_id: {
        required: true,
        type: ObjectId
    },
    
})

module.exports = mongoose.model('Room', roomSchema)