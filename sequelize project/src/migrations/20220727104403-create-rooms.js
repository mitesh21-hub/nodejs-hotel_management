"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      room_number: {
        type: Sequelize.INTEGER,
      },
      room_type: {
        type: Sequelize.ENUM({
          values: ["Single Bed", "Double Bed", "King size Bed"],
        }),
      },
      room_desc: {
        type: Sequelize.STRING,
      },
      room_amenities: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.DECIMAL(20, 2),
      },
      hotel_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Hotels",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rooms");
  },
};
