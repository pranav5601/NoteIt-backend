const {MongoClient} = require("mongodb")
const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://pranav5601:hardcode97@pranavcluster.nm7lh.mongodb.net/note_it';



async function connectDatabase(){
    try{
          await mongoose.connect(dbUrl)
        console.log("MongoDB is connected...")
    }catch(error){
        console.log(error)
    }
}

 connectDatabase()





