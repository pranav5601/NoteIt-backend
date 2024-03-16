const express = require('express');
const Note = require('./../models/note_schema.js');
const noteRouter = express.Router();


noteRouter.get('/get_notes', async (req, res) => {

    try{
        const result = await Note.find({})
        console.log(result)
        res.status(200).json(result)

    }catch(error){
        console.log(error)
        res.status(404).json({message: "No notes found!"})
    }

});


noteRouter.post('/create_note', async (req, res)=>{
    const data = new Note(req.body)


    
    try{

        const result = await data.save();
        console.log("Note saved successfully"+ result.insertedId)
        res.status(200).json({
            message: "Note saved successfully."
        })

    }catch(error){
        res.status(500).json({
            message: "Internal error occured!"
        })
    }
});

noteRouter.patch('/note/:id', async (req,res)=>{

    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedNoteUpdate = ['description', 'completed']

    const isValid = updates.every((updates)=> allowedNoteUpdate.includes(updates))

    if(!isValid){
        return res.status(400).send({'error':'Invlide operation.'})
    }

    try{
        // const task = await Task.findByIdAndUpdate(_id, req.body,{runValidators: true,new: true} )

        const note = Note.findById(_id)

        updates.forEach((updates)=> note[updates]= req.params[updates])

        await note.save() 

        if(!note){
           return res.status(404).send({'error':'Task not found.'})
        }
        res.status(200).send(note)

    }catch(e){
        res.status(500).send(e)
    }

})


module.exports = noteRouter

