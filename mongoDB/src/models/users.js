const { Number } = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
        required: true,
        type: String
    },
    user_email: {
        required: true,
        type: String
    },
    user_phone: {
        required: true,
        type: String
    },
    user_password: {
        required: true,
        type: String
    },
    user_gender: {
        required: true,
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    user_age: {
        required: true,
        type: Number
    },
    user_IDProof: {
        required: true,
        type: String,
        enum: ["Adhar ID", "Voter ID", "Licence"]
    },

})

module.exports = mongoose.model('User', userSchema)