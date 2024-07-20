const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { signAccessToken } = require("../helpers/jwt_helper");
const User = require("../models/User.model");

async function register(req, res, next) {
  const { email, password, alamat, username, telp, role } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists)
      throw createError.Conflict(`Mahasiswa with Email ${email} already exist`);

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email: email,
      password: hashedPassword,
      username: username,
      alamat: alamat,
      telp: telp,
      role: role,
    });

    res.status(201).json({
      status: 201,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      throw createError.NotFound(`User with Email ${email} is Not Found`);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw createError.Conflict("Invalid Password");

    const accessToken = await signAccessToken(email);

    const response = {
      status: 200,
      message: "success",
      data: {
        email: user.email,
        token: accessToken,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
};
