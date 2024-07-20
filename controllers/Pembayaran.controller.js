const createError = require("http-errors");
const Pembayaran = require("../models/Pembayaran.model");

async function getAllPembayaran(req, res, next) {
  try {
    const pembayaran = await Pembayaran.findAll();

    const response = {
      status: 200,
      message: "success",
      data: pembayaran,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function getPembayaranById(req, res, next) {
  const { id } = req.params;

  try {
    const pembayaran = await Pembayaran.findByPk(id);
    if (!pembayaran)
      throw createError.NotFound(
        `Pembayaran with Pembayaran ID ${id} is Not Found`
      );

    const response = {
      status: 200,
      message: "success",
      data: pembayaran,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function addPembayaran(req, res, next) {
  const { metode, jumlah } = req.body;

  try {
    const pembayaran = await Pembayaran.create({
      metode: metode,
      jumlah: jumlah,
    });

    const response = {
      status: 201,
      message: "added",
      data: pembayaran,
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

async function editPembayaran(req, res, next) {
  const { id } = req.params;
  const { metode, jumlah } = req.body;

  try {
    const pembayaran = await Pembayaran.findByPk(id);
    if (!pembayaran)
      throw createError.NotFound(
        `Pembayaran with Pembayaran ID ${id} is Not Found`
      );

    if (metode) pembayaran.metode = metode;
    if (jumlah) pembayaran.jumlah = jumlah;

    await pembayaran.save();

    const response = {
      status: 200,
      message: "success",
      data: pembayaran,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function deletePembayaran(req, res, next) {
  const { id } = req.params;

  try {
    const pembayaran = await Pembayaran.findByPk(id);
    if (!pembayaran)
      throw createError.NotFound(
        `Pembayaran with Pembayaran ID ${id} is Not Found`
      );

    await pembayaran.destroy();

    res.status(200).json({
      status: 200,
      message: "deleted",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPembayaran,
  getPembayaranById,
  addPembayaran,
  editPembayaran,
  deletePembayaran,
};
