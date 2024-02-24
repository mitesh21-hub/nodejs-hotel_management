"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Bookings", [
      {
        booking_number: "11125",
        booking_date: new Date(),
        check_in: "2022-08-25 12:34:13",
        check_out: "2022-08-26 12:34:13",
        user_id: 25,
        room_id: 29,
        hotel_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("Bookings", null, {});
  },
};
