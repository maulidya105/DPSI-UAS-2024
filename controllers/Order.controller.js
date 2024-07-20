const createError = require("http-errors");
const { Order, Barang, Vendor } = require("../models/index");

async function getAllOrder(req, res, next) {
  try {
    const order = await Order.findAll({
      include: [
        {
          model: Barang,
          as: "barang",
          attributes: ["id", "harga", "ukuran", "merk", "jenis"],
        },
        {
          model: Vendor,
          as: "vendor",
          attributes: ["id", "nama", "alamat", "jenis", "email", "telp"],
        },
      ],
    });

    res.status(200).json({
      status: 200,
      message: "success",
      data: order,
    });
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Barang,
          as: "barang",
          attributes: ["id", "harga", "ukuran", "merk", "jenis"],
        },
        {
          model: Vendor,
          as: "vendor",
          attributes: ["id", "nama", "alamat", "jenis", "email", "telp"],
        },
      ],
    });
    if (!order)
      throw createError.NotFound(`Order with Order ID ${id} is Not Found`);

    res.status(200).json({
      status: 200,
      message: "success",
      data: order,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const { barangId, vendorId, tanggal, jumlah } = req.body;

  try {
    const newOrder = await Order.create({
      barangId: barangId,
      vendorId: vendorId,
      tanggal: tanggal,
      jumlah: jumlah,
    });

    const order = await Order.findByPk(newOrder.id, {
      include: [
        {
          model: Barang,
          as: "barang",
          attributes: ["id", "harga", "ukuran", "merk", "jenis"],
        },
        {
          model: Vendor,
          as: "vendor",
          attributes: ["id", "nama", "alamat", "jenis", "email", "telp"],
        },
      ],
    });

    res.status(201).json({
      status: 201,
      message: "success",
      data: order,
    });
  } catch (error) {
    next(error);
  }
}

async function editOrder(req, res, next) {
  const { id } = req.params;
  const { barangId, vendorId, tanggal, jumlah } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order)
      throw createError.NotFound(`Order with Order ID ${id} is Not Found`);

    if (barangId) order.barangId = barangId;
    if (vendorId) order.vendorId = vendorId;
    if (tanggal) order.tanggal = tanggal;
    if (jumlah) order.jumlah = jumlah;

    await order.save();

    const populatedOrder = await Order.findByPk(id, {
      include: [
        {
          model: Barang,
          as: "barang",
          attributes: ["id", "harga", "ukuran", "merk", "jenis"],
        },
        {
          model: Vendor,
          as: "vendor",
          attributes: ["id", "nama", "alamat", "jenis", "email", "telp"],
        },
      ],
    });

    res.status(200).json({
      status: 200,
      message: "success",
      data: populatedOrder,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order)
      throw createError.NotFound(`Order with Order ID ${id} is Not Found`);

    await order.destroy();

    res.status(200).json({
      status: 200,
      message: "deleted",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllOrder,
  getOrderById,
  addOrder,
  editOrder,
  deleteOrder,
};
