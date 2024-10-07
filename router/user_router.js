const User = require("./../models/user_schema.js");
const express = require("express");

const crypto = require("crypto");
const {
    HTTP_ACCEPTED,
    HTTP_CREATED,
    NO_USER_FOUND,
    HTTP_INTERNAL_SERVER_ERROR,
    INCORRECT_PASSWORD,
    USER_ALREADY_EXIST,
    HTTP_OK,
} = require("../Utils/constans.js");
const userRouter = express.Router();

const userRes = (message, errorCode, status, data) => {
    return {
        code: errorCode,
        status: status,
        message: message,
        userData: data || {},
    };
};

userRouter.post("/signup", async (req, res) => {
    const userData = new User(req.body);
    userData["api_token"] = generateAuthCodeForUser(
        userData.email,
        userData.password
    );
    userData["userId"] = userData._id;
    console.log(userData);

    const checkEmail = await User.findOne({ email: userData.email });
    if (checkEmail) {
        return res
            .status(HTTP_OK)
            .json(userRes("User already exist", USER_ALREADY_EXIST, "error"));
    }
    if (userData.password.length < 6) {
        return res
            .status(HTTP_OK)
            .json(
                userRes(
                    "Password must be at least 6 characters",
                    INCORRECT_PASSWORD,
                    "error"
                )
            );
    }
    try {
        const result = await userData.save();

        console.log(result);
        res.status(HTTP_OK).send(
            userRes("User created successfully", HTTP_CREATED, "success", {
                full_name: result.full_name,
                email: result.email,
                api_token: result.api_token,
                userId: result.userId,
                country: result.country,
                password: result.password,
            })
        );
    } catch (error) {
        console.log("error:", error);

        res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

userRouter.post("/login", async (req, res) => {
    const data = req.body;

    const email_id = data.email;
    const password = data.password;

    try {
        const user = await User.findOne({ email: email_id });
        console.log("email:", email_id);
        console.log("user:", user);
        if (!user) {
            return res
                .status(HTTP_OK)
                .json(userRes("User not found!!", NO_USER_FOUND, "error"));
        }

        if (password !== user.password) {
            return res
                .status(HTTP_OK)
                .json(
                    userRes(
                        "Invalid Email or Password! Please try again.",
                        INCORRECT_PASSWORD,
                        "error"
                    )
                );
        }

        res.status(HTTP_ACCEPTED).json(
            userRes(
                "Login successful!",
                HTTP_ACCEPTED,
                "success",
                (userData = user)
            )
        );
    } catch (error) {
        console.log(error);
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({
            message: "Internal error.",
        });
    }
});

function generateAuthCodeForUser(email, password) {
    // Combine email and password into a single string
    const combinedString = email + password;

    // Create an MD5 hash of the combined string
    const hash = crypto.createHash("md5");
    hash.update(combinedString);
    const encryptedString = hash.digest("hex");

    return encryptedString;
}

module.exports = userRouter;
