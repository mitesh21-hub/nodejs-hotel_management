"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotels.hasMany(models.Rooms, {
        as: "rooms",
        foreignKey: { name: "hotel_id", field: "id" },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
      Hotels.hasOne(models.Bookings, {
        as: "booking",
        foreignKey: {
          name: "hotel_id",
          field: "id",
        },
      });
    }
  }
  Hotels.init(
    {
      hotel_name: DataTypes.STRING,
      hotel_address: DataTypes.STRING,
      hotel_phone: DataTypes.STRING,
      hotel_amenities: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Hotels",
      tableName: "Hotels",
    }
  );
  return Hotels;
};
