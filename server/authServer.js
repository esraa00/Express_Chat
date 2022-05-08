require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const server = express();
const cors = require("cors");

mongoose.connect(process.env.MONOGO_URI).then(() => {
  console.log("connected to the database successfully");
});

const authRoutes = require("./routes/auth");

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET , POST",
  })
);
server.use(express.json());

server.use("/api/user", authRoutes);

server.listen(3001, () => {
  console.log(`server is listening on port 3001`);
});
