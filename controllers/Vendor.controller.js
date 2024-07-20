const createError = require("http-errors");
const Vendor = require("../models/Vendor.model");

async function getAllVendor(req, res, next) {
  try {
    const vendor = await Vendor.findAll();

    res.status(200).json({
      status: 200,
      message: "success",
      data: vendor,
    });
  } catch (error) {
    next(error);
  }
}

async function getVendorById(req, res, next) {
  const { id } = req.params;

  try {
    const vendor = await Vendor.findByPk(id);
    if (!vendor)
      throw createError.NotFound(`Vendor with Vendor ID ${id} is Not Found`);

    res.status(200).json({
      status: 200,
      message: "success",
      data: vendor,
    });
  } catch (error) {
    next(error);
  }
}

async function addVendor(req, res, next) {
  const { nama, alamat, email, jenis, telp, status } = req.body;

  try {
    const vendor = await Vendor.create({
      nama: nama,
      alamat: alamat,
      telp: telp,
      status: status,
      email: email,
      jenis: jenis,
    });

    res.status(201).json({
      status: 201,
      message: "added",
      data: vendor,
    });
  } catch (error) {
    next(error);
  }
}

async function editVendor(req, res, next) {
  const { id } = req.params;
  const { nama, alamat, email, jenis, telp, status } = req.body;

  try {
    const vendor = await Vendor.findByPk(id);
    if (!vendor)
      throw createError.NotFound(`Vendor with Vendor ID ${id} is Not Found`);

    if (nama) vendor.nama = nama;
    if (alamat) vendor.alamat = alamat;
    if (email) vendor.email = email;
    if (jenis) vendor.jenis = jenis;
    if (telp) vendor.telp = telp;
    if (status) vendor.status = status;

    await vendor.save();

    res.status(200).json({
      status: 200,
      message: "success",
      data: vendor,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteVendor(req, res, next) {
  const { id } = req.params;

  try {
    const vendor = await Vendor.findByPk(id);
    if (!vendor)
      throw createError.NotFound(`Vendor with Vendor ID ${id} is Not Found`);

    await vendor.destroy();

    res.status(200).json({
      status: 200,
      message: "success",
      data: vendor,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllVendor,
  getVendorById,
  addVendor,
  deleteVendor,
  editVendor,
};
