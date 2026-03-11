"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          user_name: "Mit Patel",
          user_email: "mit@gmail.com",
          user_phone: 9875641230,
          user_gender: "Male",
          user_age: 27,
          user_password: "hash",
          user_IDProof: "Adhar ID",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
