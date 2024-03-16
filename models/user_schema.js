const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const user_schema = mongoose.Schema({
    full_name: String,
    email: { 
        type: String,
        unique: true,
        require: true
    },
    password: {

        type: String,
        minlength: 5,
        require: true
    },
    api_token: String
})

user_schema.pre('save',async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()

})

const User =  mongoose.model('User', user_schema)

module.exports = User
