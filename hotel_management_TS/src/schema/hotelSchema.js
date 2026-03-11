module.exports = {
  hotelSchema: {
    id: "hotelId",
    hotel_name: "hotel_name",
    hotel_address: "hotel_address",
    hotel_phone: "hotel_phone",
    hotel_amenities: "hotel_amenities",
  },
};
module.exports = {
  roomSchema: {
    id: "roomId",
    room_number: "room_number",
    room_type: "room_type",
    room_desc: "room_desc",
    room_amenities: "room_amenities",
    room_price: "room_price",
    hotelsId: "hotelsId",
  },
};
module.exports = {
  userSchema: {
    id: "userId",
    user_name: "user_name",
    user_email: "user_email",
    user_phone: "user_phone",
    user_age: "user_age",
    user_gender: "user_gender",
    user_password: "user_password",
    user_IDProof: "user_IDProof",
  },
};
module.exports = {
  bookingSchema: {
    id: "bookingId",
    booking_number: "booking_number",
    booking_date: "booking_date",
    check_in: "check_in",
    check_out: "check_out",
    userId: "userId",
    hotelsId: "hotelsId",
    roomsId: "roomsId",
  },
};
