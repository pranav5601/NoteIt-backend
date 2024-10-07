const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_LINK;

async function connectDatabase() {
    try {
        await mongoose.connect(dbUrl);
        console.log("MongoDB is connected...");
    } catch (error) {
        console.log(error);
    }
}

connectDatabase();
