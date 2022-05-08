require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;
  //check if user is already registered
  const user = await User.findOne({ email: email });
  if (user) return res.status(400).send("user already exists");
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  //register the user in the database
  await User.create({
    username: username,
    email: email,
    password: hashedPassword,
    phone: phone,
  })
    .then(res.send("user successfully registered"))
    .catch((err) => {
      res.status(400).send(`coudn't register user`);
    });
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body;
  //check if the email exists
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send(`email doesn't exist,please sign up`);
  //check if password matches
  const isPasswordTrue = await bcrypt.compare(password, user.password);
  if (!isPasswordTrue) return res.status(400).send(`password doesn't match`);

  const accessToken = generateAccessToken({
    id: user._id,
    username: username,
    email: email,
  });
  const refreshToken = jwt.sign(
    { id: user._id, username: username, email: email },
    process.env.SECRET_KEY_REFRESH,
    { expiresIn: "1m" }
  );

  res
    .cookie("accessToken", accessToken, {
      maxAge: 15000,
      httpOnly: true,
    })
    .cookie("refreshToken", refreshToken, {
      maxAge: 60000,
      httpOnly: true,
    })

    .send("we sent to you 2 cookies");
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "15s" });
}

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken == null)
    return res.redirect("http://localhost:3000/api/user/login");
  jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH, (error, user) => {
    if (error) return res.status(403);
    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    res.cookie("accessToken", accessToken, {
      maxAge: 15000,
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
};
