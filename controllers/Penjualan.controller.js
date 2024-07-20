const createError = require("http-errors");
const {
  Order,
  Barang,
  Vendor,
  Penjualan,
  User,
  Pembayaran,
} = require("../models/index");

async function getAllPenjualan(req, res, next) {
  try {
    const penjualan = await Penjualan.findAll({
      include: [
        {
          model: Pembayaran,
          as: "pembayaran",
          attributes: ["jumlah", "metode"],
        },
        {
          model: Barang,
          as: "barang",
          attributes: ["id", "harga", "ukuran", "merk", "jenis"],
        },
        {
          model: User,
          as: "karyawan",
          attributes: ["id", "username", "role"],
        },
      ],
    });

    res.status(200).json({
      status: 200,
      message: "success",
      data: penjualan,
    });
  } catch (error) {
    next(error);
  }
}

async function getPenjualanById(req, res, next) {
  const { id } = req.params;

  try {
    const penjualan = await Penjualan.findByPk(id, {
      include: [
        {
          model: Pembayaran,
          as: "pembayaran",
          attributes: ["jumlah", "metode"],
        },
        {
          model: Barang,
          as: "barang",
          attributes: ["id", "harga", "ukuran", "merk", "jenis"],
        },
        {
          model: User,
          as: "karyawan",
          attributes: ["id", "username", "role"],
        },
      ],
    });
    if (!penjualan)
      throw createError.NotFound(
        `Penjualan with Penjualan ID ${id} is Not Found`
      );

    res.status(200).json({
      status: 200,
      message: "success",
      data: penjualan,
    });
  } catch (error) {
    next(error);
  }
}

async function addPenjualan(req, res, next) {
  const { pembayaranId, barangId, karyawanId } = req.body;

  try {
    const isCashier = await User.findByPk(karyawanId);
    if (!isCashier)
      throw createError.NotFound(
        `Karyawan with User ID ${karyawanId} is Not Found`
      );
    if (isCashier.role !== "cashier")
      throw createError.Unauthorized(
        `Karyawan with Karyawan ID ${karyawanId} is Not a Cashier Role`
      );

    const newPenjualan = await Penjualan.create({
      pembayaranId: pembayaranId,
      barangId: barangId,
      karyawanId: karyawanId,
    });

    const penjualan = await Penjualan.findByPk(newPenjualan.id, {
      include: [
        {
          model: Pembayaran,
          as: "pembayaran",
          attributes: ["jumlah", "metode"],
        },
        {
          model: Barang,
          as: "barang",
          attributes: ["id", "harga", "ukuran", "merk", "jenis"],
        },
        {
          model: User,
          as: "karyawan",
          attributes: ["id", "username", "role"],
        },
      ],
    });

    res.status(201).json({
      status: 201,
      message: "success",
      data: penjualan,
    });
  } catch (error) {
    next(error);
  }
}

async function editPenjualan(req, res, next) {
  const { id } = req.params;
  const { pembayaranId, barangId, karyawanId } = req.body;

  try {
    const penjualan = await Penjualan.findByPk(id);
    if (!penjualan)
      throw createError.NotFound(
        `Penjualan with Penjualan ID ${id} is Not Found`
      );

    let newKaryawanId;
    if (karyawanId) {
      const isCashier = await User.findByPk(karyawanId);
      if (!isCashier)
        throw createError.NotFound(
          `Karyawan with User ID ${karyawanId} is Not Found`
        );
      if (isCashier.role !== "cashier")
        throw createError.Unauthorized(
          `Karyawan with Karyawan ID ${karyawanId} is Not a Cashier Role`
        );

      newKaryawanId = isCashier.id;
    }
    penjualan.karyawanId = newKaryawanId;

    if (pembayaranId) penjualan.pembayaranId = pembayaranId;
    if (barangId) penjualan.barangId = barangId;

    await penjualan.save();

    const populatedPenjualan = await Penjualan.findByPk(id, {
      include: [
        {
          model: Pembayaran,
          as: "pembayaran",
          attributes: ["jumlah", "metode"],
        },
        {
          model: Barang,
          as: "barang",
          attributes: ["id", "harga", "ukuran", "merk", "jenis"],
        },
        {
          model: User,
          as: "karyawan",
          attributes: ["id", "username", "role"],
        },
      ],
    });

    res.status(200).json({
      status: 200,
      message: "success",
      data: populatedPenjualan,
    });
  } catch (error) {
    next(error);
  }
}

async function deletePenjualan(req, res, next) {
  const { id } = req.params;

  try {
    const penjualan = await Penjualan.findByPk(id);
    if (!penjualan)
      throw createError.NotFound(
        `Penjualan with Penjualan ID ${id} is Not Found`
      );

    await penjualan.destroy();

    res.status(200).json({
      status: 200,
      message: "deleted",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPenjualan,
  getPenjualanById,
  addPenjualan,
  editPenjualan,
  deletePenjualan,
};
