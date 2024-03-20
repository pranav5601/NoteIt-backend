const { Long } = require("mongodb");
const mongoose = require("mongoose");

const reminder_schema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        require: true,
    },
    user_id: {
        type: String,
        require: true,
    },
    noteId: {
        type: Number,
        require: true,
    },
    reminderTime: String,
    reminderDate: String,
    reminderRepetition: {
        type: Number,
        require: true,
    },
    reminderTimestamp: {
        type: Number,
        require: true,
    },
    reminderLat: Number,
    remidnerLong: Number,
});

const Reminder = mongoose.model("Reminder", reminder_schema, "reminder_data");

module.exports = Reminder;
