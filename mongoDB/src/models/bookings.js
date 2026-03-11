const { ObjectId } = require('mongodb');
const { Number } = require('mongoose');
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    booking_number: {
        required: true,
        type: String
    },
    booking_date: {
        required: true,
        type: Date
    },
    check_in: {
        required: true,
        type: Date
    },
    check_out: {
        required: true,
        type: Date
    },
    user_id: {
        required: true,
        type: ObjectId
    },
    room_id: {
        required: true,
        type: ObjectId
    },
    hotel_id: {
        required: true,
        type: ObjectId
    }
});

module.exports = mongoose.model('Booking', bookingSchema);