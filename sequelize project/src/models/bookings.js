"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookings.belongsTo(models.Users, {
        as: "users",
        foreignKey: {
          name: "user_id",
          field: "id",
        },
      });
      Bookings.belongsTo(models.Hotels, {
        as: "hotels",
        foreignKey: {
          name: "hotel_id",
          field: "id",
        },
      });
      Bookings.belongsTo(models.Rooms, {
        as: "rooms",
        through: "room_id",
        foreignKey: {
          name: "room_id",
          field: "id",
        },
      });
    }
  }
  Bookings.init(
    {
      booking_number: DataTypes.STRING,
      booking_date: DataTypes.DATE,
      check_in: DataTypes.DATE,
      check_out: DataTypes.DATE,
      user_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
      hotel_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Bookings",
      tableName: "Bookings",
    }
  );
  return Bookings;
};
