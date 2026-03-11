"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rooms.hasOne(models.Bookings, {
        as: "booking",
        foreignKey: {
          name: "room_id",
          field: "id",
        },
      });
      Rooms.belongsTo(models.Hotels, {
        as: "Hotels",
        foreignKey: {
          name: "hotel_id",
          field: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
    }
  }
  Rooms.init(
    {
      room_number: DataTypes.INTEGER,
      room_type: DataTypes.ENUM({
        values: ["Single Bed", "Double Bed", "King size Bed"],
      }),
      room_desc: DataTypes.STRING,
      room_amenities: DataTypes.STRING,
      price: DataTypes.DECIMAL(20, 2),
      hotel_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Rooms",
      tableName: "Rooms",
    }
  );
  return Rooms;
};
