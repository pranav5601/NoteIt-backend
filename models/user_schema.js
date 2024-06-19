const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user_schema = new mongoose.Schema({
    full_name: String,
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        minlength: 5,
        require: true,
    },
    full_name: String,
    country: String,
    api_token: String,
    userId: String,
});

const User = mongoose.model("User", user_schema, "user_data");

module.exports = User;
