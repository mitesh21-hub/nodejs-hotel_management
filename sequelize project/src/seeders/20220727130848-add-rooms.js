"use strict";

// const hotels = require("../models/hotels");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Rooms", [
      {
        room_number: "401",
        room_type: "King Size Bed",
        room_desc: "Deluxe King Size Bed room with TV",
        room_amenities: "TV, wifi",
        hotel_id: 17,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        room_number: "402",
        room_type: "Double Bed",
        room_desc: "Deluxe Double Bed room with TV",
        room_amenities: "TV, wifi",
        hotel_id: 17,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("Rooms", null, {});
  },
};
