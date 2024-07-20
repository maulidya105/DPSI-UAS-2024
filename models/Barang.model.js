const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/init_mysql");

class Barang extends Model {}

Barang.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jenis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ukuran: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    merk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Barang",
    tableName: "barang",
    timestamps: false,
  }
);

module.exports = Barang;
