const { Long } = require("mongodb");
const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    noteId: {
        type: String,
        unique: true,
        require: true,
    },
    userId: {
        type: String,
    },

    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    timeStamp: {
        type: String,
        require: true,
    },
    isReminderSet: {
        type: Boolean,
        default: false,
        require: true,
    },
    noteImages: String,
    note_type: {
        type: String,
        default: "text",
    },
});

const Note = mongoose.model("Note", NoteSchema, "note_data");

module.exports = Note;
