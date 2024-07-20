const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../helpers/init_mysql");
const Barang = require("./Barang.model");
const Vendor = require("./Vendor.model");

class Order extends Model {
  toJSON() {
    const attributes = { ...this.get() };
    delete attributes.barangId;
    delete attributes.vendorId;
    return attributes;
  }
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    barangId: {
      type: DataTypes.INTEGER,
      references: {
        model: Barang,
        key: "id",
      },
    },
    vendorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Vendor,
        key: "id",
      },
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "order",
    timestamps: false,
  }
);

module.exports = Order;
