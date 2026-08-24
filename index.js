const express = require("express");
require("./database.js");
const noteRouter = require("./router/note_router.js");
const reminderRouter = require("./router/reminder_router.js");
const userRouter = require("./router/user_router.js");
const ServerlessHttp = require("serverless-http");
const app = express();
const port = 3030;
const cors = require("cors");

// Middleware to parse JSON bodies

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://192.168.1.9:5173/",
            "*", // Allow your local Vite dev server    // Allow your deployed frontend later
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.use(express.json());
app.use(noteRouter);
app.use(reminderRouter);
app.use(userRouter);

// Start the server
app.listen(process.env.port || port, () => {
    console.log(`Server running at http://10.0.0.161:${port}`);
});
