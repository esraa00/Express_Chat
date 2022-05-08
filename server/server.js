require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

mongoose.connect(process.env.MONOGO_URI).then(() => {
  console.log("connected to the database successfully");
});

const servicesRoutes = require("./routes/services");

server.use(cors());
server.use(express.json());
server.use(cookieParser());

// to check if the user have the authority
server.use((req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  console.log(req.cookies);
  if (accessToken == null) {
    if (refreshToken == null) {
      console.log("accesstoken is null and refresh token in null");
      res.send("please login again");
    } else {
      console.log("access token is null only");
      jwt.verify(
        refreshToken,
        process.env.SECRET_KEY_REFRESH,
        (error, user) => {
          if (error) return res.send("refresh token is invalid");
          const accessToken = generateAccessToken({
            id: user.id,
            name: user.name,
            email: user.email,
          });
          req.user = user;
          console.log("access token is refreshed");
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 15000,
          });
          next();
        }
      );
    }
  } else {
    console.log("access token is found");
    jwt.verify(accessToken, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        console.log("access token is found and is tempred with");
        return res.status(401).send();
      }
      req.user = user;
      next();
      console.log("access token is valid");
    });
  }
});

server.use("/api/services", servicesRoutes);
server.listen(4000, () => {
  console.log(`server is listening on port 4000`);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "15s" });
}
