const User = require("../models/user");

// const modifyUser = async (req, res) => {
//   try {
//     const { _id } = req.body;
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const fetchUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const { _id, username } = user._doc;
    res.send({ _id, username });
  } catch (error) {
    console.log(error);
  }
};

const fetchUserByName = async (req, res) => {
  const usernName = req.params.username;
  const { username, _id, phone } = await User.findOne({ username: usernName });
  res.send({ username, _id, phone });
};

const logoutUser = (req, res) => {
  res
    .cookie("accessToken", "", { maxAge: 0, httpOnly: true })
    .cookie("refreshToken", "", { maxAge: 0, httpOnly: true })
    .status(200)
    .send();
};

module.exports = { fetchUser, fetchUserByName, logoutUser };
