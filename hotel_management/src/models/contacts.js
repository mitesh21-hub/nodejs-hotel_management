"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contacts.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    subject: DataTypes.ENUM({
      values: ["Inquiry", "Booking", "Cancellation", "Refund", "General"],
    }),
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Contacts",
    tableName: "Contacts"
  });
  return Contacts;
};