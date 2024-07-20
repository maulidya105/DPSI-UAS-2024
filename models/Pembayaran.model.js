const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/init_mysql");

class Pembayaran extends Model {}

Pembayaran.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    metode: {
      type: DataTypes.ENUM,
      values: ["credit", "debit"],
      allowNull: false,
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Pembayaran",
    tableName: "pembayaran",
    timestamps: false,
  }
);

module.exports = Pembayaran;
