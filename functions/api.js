const express = require("express");
require("../database.js");
const noteRouter = require("../router/note_router.js");
const reminderRouter = require("../router/reminder_router.js");
const userRouter = require("../router/user_router.js");
const ServerlessHttp = require("serverless-http");
const app = express();
const port = 3030;

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/.netlify/functions/api/notes", noteRouter);
app.use("/.netlify/functions/api/reminders", reminderRouter);
app.use("/.netlify/functions/api/users", userRouter);

const handler = ServerlessHttp(app);

module.exports.handler = async (event, context) => {
    const result = await handler(event, context);
    return result;
};
