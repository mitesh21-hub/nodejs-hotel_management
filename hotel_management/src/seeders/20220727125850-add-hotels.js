"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Hotels",
      [
        {
          hotel_name: "Hotel Alinea",
          hotel_address: "Hotel Alinea, Ahmedabad, Gujarat",
          hotel_phone: 8668545211,
          hotel_amenities: "swimming pool, room service, vehicle",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          hotel_name: "Hotel Rio",
          hotel_address: "Hotel rio, Ahmedabad, Gujarat",
          hotel_phone: 8865554211,
          hotel_amenities: "swimming pool",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("Hotels", null, {});
  },
};
