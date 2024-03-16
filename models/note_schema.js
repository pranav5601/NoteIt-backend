const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    noteId: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    timeStemp: {
        type: Number,
        require: true
    },
    isReminderSet: {
        type: Boolean,
        default: false,
        require: true
    },
    noteImages: String,
    type: {
        type: String,
        default: "text"
    }
});

const Note = mongoose.model('Note', NoteSchema, 'note_data')


module.exports = Note


