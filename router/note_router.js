const express = require("express");
const Note = require("./../models/note_schema.js");
const noteRouter = express.Router();
const mongoose = require("mongoose");

noteRouter.get("/get_notes/:user_id", async (req, res) => {
    const userId = req.params.user_id;

    try {
        const result = await Note.find({ user_id: userId });
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "No notes found!" });
    }
});

noteRouter.post("/create_note", async (req, res) => {
    const temp = req.body;
    console.log(temp);
    const data = new Note(req.body);
    // data._id = new mongoose.Types.ObjectId(data.noteId);

    try {
        const result = await data.save();
        console.log("Note saved successfully" + result);
        res.status(200).json({
            message: "Note saved successfully.",
        });
    } catch (error) {
        console.log(error.message);

        res.status(500).json({ message: "Internal Error!" });
    }
});

noteRouter.patch("/update_note/:note_id", async (req, res) => {
    const id = req.params.note_id;
    const updates = Object.keys(req.body);
    const allowedNoteUpdate = [
        "user_id",
        "title",
        "description",
        "note_type",
        "noteImages",
        "timeStamp",
        "isReminderSet",
    ];

    const isValid = updates.every((updates) =>
        allowedNoteUpdate.includes(updates)
    );
    console.log(isValid);

    if (!isValid) {
        return res.status(400).send({ error: "Invlide operation." });
    }

    try {
        // const task = await Task.findByIdAndUpdate(_id, req.body,{runValidators: true,new: true} )

        const note = req.body;
        console.log(note.noteId);

        const result = await Note.findOneAndUpdate(
            (filter = { noteId: id }),
            (update = note)
        );
        console.log(result);

        if (!note) {
            return res.status(404).send({ error: "Task not found." });
        }

        // if (!old_note) {
        //     return res.status(404).send(old_note);
        // }
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

noteRouter.delete("/remove_note", async (req, res) => {
    try {
        const result = await Note.findOneAndDelete(req.body);
        console.log(result);
        // if (!result) {
        //     res.status(400).send({ message: "Internal error" });
        // }
        res.status(200).send({ message: "Note deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Error!");
    }
});

module.exports = noteRouter;
