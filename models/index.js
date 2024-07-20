const Order = require("../models/Order.model");
const Barang = require("./Barang.model");
const Pembayaran = require("./Pembayaran.model");
const Penjualan = require("./Penjualan.model");
const User = require("./User.model");
const Vendor = require("./Vendor.model");

Order.belongsTo(Barang, { as: "barang", foreignKey: "barangId" });
Order.belongsTo(Vendor, { as: "vendor", foreignKey: "vendorId" });
Penjualan.belongsTo(Pembayaran, {
  as: "pembayaran",
  foreignKey: "pembayaranId",
});
Penjualan.belongsTo(Barang, { as: "barang", foreignKey: "barangId" });
Penjualan.belongsTo(User, { as: "karyawan", foreignKey: "karyawanId" });

module.exports = {
  Order,
  Barang,
  Pembayaran,
  User,
  Vendor,
  Penjualan,
};
