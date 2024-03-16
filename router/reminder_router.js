const express = require('express');
const Reminder = require('./../models/reminder_schema');
const reminderRouter = express.Router();


reminderRouter.post('/create_reminder', async (req, res)=>{
    const reminderData = new Reminder(req.body)

    try{
        const setReminder = await reminderData.save()
        console.log("Reminder saved Successfully", setReminder._id);
        res.status(200).send("Reminder set successfully");
    }catch(error){
        res.status(401).send({message: "Internal error!"})
        console.log(error);
    }


});

reminderRouter.get('/get_reminder_for_note/:noteId', async(req, res)=>{

    const noteId = req.query.noteId;
    if(!noteId){
        res.status(403).send({message:"Missing Parameters!"})
    }

    try{
            const reminder = await Reminder.findOne({noteId});
            res.status(200).send(reminder);
            console.log(reminder)
    }catch(error){
        res.status(403).send({message:"Internal Error!"});
        console.log(error.message)

    }
})


reminderRouter.get('getAllReminders', async (req, res)=>{
    try{
        const reminder = await Reminder.find();
        res.status(200).send(reminder);
        console.log(reminder)
    }catch(error){
        res.status(403).send({message:"Internal Error!"});
        console.log(error.message)

    }
})

module.exports = reminderRouter