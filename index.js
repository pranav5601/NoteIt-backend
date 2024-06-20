const express = require("express");
require("./database.js");
const noteRouter = require("./router/note_router.js");
const reminderRouter = require("./router/reminder_router.js");
const userRouter = require("./router/user_router.js");
const ServerlessHttp = require("serverless-http");
const app = express();
const port = 3030;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(noteRouter);
app.use(reminderRouter);
app.use(userRouter);

// Start the server
app.listen(process.env.port || port, () => {
    console.log(`Server running at http://10.0.0.161:${port}`);
});
