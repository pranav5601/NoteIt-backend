const User = require("./../models/user_schema.js");
const express = require("express");
const crypto = require("crypto");
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
    const userData = new User(req.body);
    userData["api_token"] = generateAuthCodeForUser(
        userData.email,
        userData.password
    );
    userData["userId"] = userData._id;
    console.log(userData);
    try {
        const result = await userData.save();
        console.log(result);
        res.status(200).send({
            userData,
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: "Internal error!" });
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
            return res.status(400).json({ message: "User not found" });
        }

        if (password !== user.password) {
            return res
                .status(400)
                .json({ message: "Invalid email or password!" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal error." });
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
