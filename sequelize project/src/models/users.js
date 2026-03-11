"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Bookings, {
        as: "bookings",
        foreignKey: { name: "user_id", field: "id" },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
    }
  }
  Users.init(
    {
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_phone: DataTypes.STRING,
      user_age: DataTypes.INTEGER,
      user_gender: DataTypes.ENUM({
        values: ["Male", "Female", "Others"],
      }),
      user_password: DataTypes.STRING,
      user_IDProof: DataTypes.ENUM({
        values: ["Adhar ID", "Voter ID", "License ID"],
      }),
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "Users",
    }
  );
  return Users;
};
