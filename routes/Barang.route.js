const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_helper");
const BarangController = require("../controllers/Barang.controller");

router.get("/", verifyAccessToken, BarangController.getAllBarang); //function verifyAccessToken digunakan sebagai middleware untuk melakukan validasi apakah bearer token yang diberikan pada saat memanggil API valid atau tidak. 

router.get("/:id", verifyAccessToken, BarangController.getBarangById);

router.post("/", verifyAccessToken, BarangController.addBarang);

router.patch("/:id", verifyAccessToken, BarangController.editBarang);

router.delete("/:id", verifyAccessToken, BarangController.deleteBarang);

module.exports = router;
