const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username not available "],
    validate: {
      validator: function (username) {
        var errors = [];
        if (username.length < 5) {
          errors.push("username must be from 8 to 20 characters long");
        }
        if (errors.length > 0) {
          throw new Error(errors);
        }
      },
    },
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email not available"],
    validate: {
      validator: function (email) {
        var errors = [];
        if (email.length < 5) {
          errors.push("please enter valid name");
        }
        if (errors.length > 0) {
          throw new Error(errors);
        }
      },
    },
  },
  password: {
    type: String,
    required: [true, "passowrd is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
    unique: [true, "phone not available"],
    validate: {
      validator: function (password) {
        var errors = [];
        if (!password.match(/[0-9]{11}/)) {
          errors.push("phone number must be 11 numbers");
        }
        if (errors.length > 0) {
          throw new Error(errors);
        }
      },
    },
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
