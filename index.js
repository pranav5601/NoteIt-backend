const express = require('express');
require('./database.js')
const noteRouter = require('./router/note_router.js')
const reminderRouter = require('./router/reminder_router.js')
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(noteRouter);
app.use(reminderRouter);






// Route to handle POST requests
// app.post('/signup', async (req, res) => {
//     const data = req.body;

//     const full_name = data.full_name;
//     const email_id = data.email_id;
//     const password = data.password;

//     console.log(req.headers);

//     const User = mongoose.model('user_data', userSchema,'user_data');
    
    
    
//     if(!full_name || !email_id || !password){
//         return res.status(403).json({message: "Missing information!"})
//     }
    
//     try{

//         const userAuthCode = generateAuthCodeForUser(email_id, password)
//         const new_user = User({
//             full_name: full_name,
//             email: email_id,
//             password: password,
//             api_token: userAuthCode
//         })
    
        
//         const result = await new_user.save();
//         if(!result){
//             console.log("Error")
//             return res.status(401).json({message: "User already exist!"})
//         }else{
//             res.status(200).json({ 
//                 message: 'Data received successfully',
//                 "userAuthCode": userAuthCode
//             });
//         }
        

//     }catch(error){
//         console.log("error in database conncetion!")
//         res.status(500).json({message:"Error in database conncetion!"})
//     }

    
// });

// app.post('/login', async(req, res) => {
//     const data = req.body;

//     const email_id = data.email_id;
//     const password = data.password;

//     try{

//         const user = await user_data.findOne({email_id});
//         console.log(user)
//         if(!user){
//             return res.status(400).json({ message: 'User not found' });
//         }


        
//         if (password !== user.password) {
//             return res.status(400).json({ message: 'Invalid email or password!' });
//         }

//         res.status(200).json(user)

//     }catch(error){
//         console.log(error)
//         res.status(500).json({message:"Internal error."})
//     }
// })



// function generateAuthCodeForUser(email, password) {
//     // Combine email and password into a single string
//     const combinedString = email + password;

//     // Create an MD5 hash of the combined string
//     const hash = crypto.createHash('md5');
//     hash.update(combinedString);
//     const encryptedString = hash.digest('hex');

//     return encryptedString;
// }



// Start the server
app.listen(process.env.port || port, () => {
    console.log(`Server running at http://10.0.0.161:${port}`);
});