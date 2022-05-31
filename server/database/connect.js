const mongoose = require("mongoose");

const connect = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://mongo:27017/myDatabase"
    );
    console.log("connected to the database successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connect };
