const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    phone: {
        required: true, 
        type: String
    },
    subject: {
        required: true,
        type: String,
        enum: ["Inquiry", "Booking", "Cacelnlation", "Refund", "General"]
    },
    message: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Contact', contactSchema);