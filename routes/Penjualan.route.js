const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_helper");
const PenjualanController = require("../controllers/Penjualan.controller");

router.get("/", verifyAccessToken, PenjualanController.getAllPenjualan);

router.get("/:id", verifyAccessToken, PenjualanController.getPenjualanById);

router.post("/", verifyAccessToken, PenjualanController.addPenjualan);

router.patch("/:id", verifyAccessToken, PenjualanController.editPenjualan);

router.delete("/:id", verifyAccessToken, PenjualanController.deletePenjualan);

module.exports = router;
