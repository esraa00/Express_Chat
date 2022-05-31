const mongoose = require("mongoose");
const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connect } = require("./database/connect");
const { generateAccessToken } = require("./controller/authUser");
require("dotenv").config();
connect();

const userRoutes = require("./routes/user");
const conversationRoutes = require("./routes/conversation");
const messageRoutes = require("./routes/message");

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET , POST",
  })
);

server.use(express.json());
server.use(cookieParser());

// to check if the user have the authority
server.use((req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (!accessToken) {
    if (!refreshToken) {
      console.log("accesstoken is null and refresh token in null");
      return res.status(403).send("please login again");
    } else {
      console.log("access token is null only");
      jwt.verify(
        refreshToken,
        process.env.SECRET_KEY_REFRESH,
        (error, user) => {
          if (error) return res.status(403).send("refresh token is invalid");
          const accessToken = generateAccessToken({
            _id: user._id,
            username: user.username,
            email: user.email,
          });
          console.log("access token is refreshed");
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 1800000,
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
        return res.status(401).send("error in access token");
      }
      next();
      console.log("access token is valid");
    });
  }
});

server.use("/api/services/conversation", conversationRoutes);
server.use("/api/services/message", messageRoutes);
server.use("/api/services/user", userRoutes);

server.listen(4000, () => {
  console.log(`server is listening on port 4000`);
});
