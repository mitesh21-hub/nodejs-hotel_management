const { ObjectID, ObjectId } = require("bson");

module.exports = {
    bookingSchema:{
    booking_number: "Hot-201-1234",
    booking_date: "2022-09-13T12:35:23.000Z",
    check_in: "2022-09-28T12:35:23.000Z",
    check_in: "2022-09-29T12:35:23.000Z",
    roomsId: ObjectId("632037316b1b8d63c85abd08"),
    hotelsId: ObjectId("6320360d872a657a54f90e20"),
    userId: ObjectId("6320360d872a657a54f90e22")
    }
}