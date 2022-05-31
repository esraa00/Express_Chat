require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const server = express();
const cors = require("cors");
const { connect } = require("./database/connect");

const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");

connect();
server.use(cookieParser());

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET , POST",
  })
);

server.use(express.json());

server.use("/api/auth", authRoutes);
//middleware to handle mongoose validation error
server.use(function (err, req, res, next) {
  var errors = [];
  if (!err.errors) {
    var errorName = Object.keys(err.keyValue)[0];
    errors.push({
      [errorName]: `${errorName} already exist`,
    });
  } else {
    Object.values(err.errors)?.map((error) => {
      errors.push({
        [error.properties.path]: error.properties.message.split(","),
      });
    });
  }
  res.status(400).send({
    errors,
  });
});

server.listen(3001, () => {
  console.log(`server is listening on port 3001`);
});
