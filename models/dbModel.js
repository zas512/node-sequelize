const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);
console.log(User === sequelize.model.User);
