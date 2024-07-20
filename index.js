const createError = require("http-errors");
const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const sequelize = require("./helpers/init_mysql");
const AuthRoute = require("./routes/Auth.route");
const BarangRoute = require("./routes/Barang.route");
const PembayaranRoute = require("./routes/Pembayaran.route");
const OrderRoute = require("./routes/Order.route");
const VendorRoute = require("./routes/Vendor.route");
const PenjualanRoute = require("./routes/Penjualan.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "PATCH", "DELETE"],

  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOpts));
app.options("*", cors(corsOpts));

app.get("/", async (req, res, next) => {
  res.send("Hello it's Manajemen Gudang Backend");
});

app.use("/auth", AuthRoute);
app.use("/barang", BarangRoute);
app.use("/pembayaran", PembayaranRoute);
app.use("/order", OrderRoute);
app.use("/vendor", VendorRoute);
app.use("/penjualan", PenjualanRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

sequelize.sync({ alter: true }).then(() => {
  console.log("Database Synced");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const server = http.createServer(app);

server.setTimeout(6000, (socket) => {
  console.log("Request has timed out");
  socket.end("Request has timed out");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
