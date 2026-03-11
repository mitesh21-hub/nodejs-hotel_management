"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_phone: {
        type: Sequelize.STRING,
      },
      user_age: {
        type: Sequelize.INTEGER,
      },
      user_gender: {
        type: Sequelize.ENUM({
          values: ["Male", "Female", "Others"],
        }),
      },
      user_password: {
        type: Sequelize.STRING,
      },
      user_IDProof: {
        type: Sequelize.ENUM({
          values: ["Adhar ID", "Voter ID", "License ID"],
        }),
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
    await queryInterface.dropTable("Users");
  },
};
