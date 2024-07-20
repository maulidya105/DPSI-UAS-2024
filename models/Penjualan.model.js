const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/init_mysql");
const Pembayaran = require("./Pembayaran.model");
const Barang = require("./Barang.model");
const User = require("./User.model");

class Penjualan extends Model {
  toJSON() {
    const attributes = { ...this.get() };
    delete attributes.pembayaranId;
    delete attributes.barangId;
    delete attributes.karyawanId;
    return attributes;
  }
}

Penjualan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    pembayaranId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pembayaran,
        key: "id",
      },
    },
    barangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Barang,
        key: "id",
      },
    },
    karyawanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Penjualan",
    tableName: "penjualan",
    timestamps: false,
  }
);

module.exports = Penjualan;
