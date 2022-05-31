require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });
    return res.status(200).send("user successfully registered");
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
  });

  if (!user)
    return res.status(400).send(`account doesn't exist,please sign up`);

  const isPasswordTrue = await bcrypt.compare(password, user.password);
  if (!isPasswordTrue)
    return res.status(400).send(`email or password is wrong`);

  const accessToken = generateAccessToken({
    _id: user._id,
    username: user.username,
    email: user.email,
  });
  const refreshToken = jwt.sign(
    { _id: user._id, username: user.username, email: user.email },
    process.env.SECRET_KEY_REFRESH,
    { expiresIn: "7d" }
  );
  res
    .cookie("accessToken", accessToken, {
      maxAge: 1800000,
      httpOnly: true,
    })
    .cookie("refreshToken", refreshToken, {
      maxAge: 604800000,
      httpOnly: true,
    })
    .status(200)
    .send({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "30m" });
}

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken == null) return res.send("please login again");
  jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH, (error, user) => {
    if (error) return res.status(403);
    const accessToken = generateAccessToken({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 1800000,
    });
  });
};

const isLoggedIn = (req, res) => {
  if (req.cookies) {
    return req.cookies !== null;
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  isLoggedIn,
  generateAccessToken,
};
