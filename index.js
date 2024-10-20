const express = require('express')
const app = express()
const port = 3005
const mongoose = require('mongoose')
const {Cat} = require('./Model')
const cors = require('cors');

app.use(express.json());
app.use(cors())
const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://chandu:Cbk%408088232120@cluster0.poroy.mongodb.net/myDb`)
    console.log(`the db is connected with ${mongoose.connection.host}`);
}
connectDB();
// app.get('/',async(req,res)=>{
//     const cat = new Cat({
//         name:"chandu"
//     })
//     const data = await cat.save() 
//     res.send(data)
// })
const Schema = mongoose.Schema;
const dataSchema = new Schema({
    name: String,
    date:String,
    value: { // Change this to an object containing total and iceCreamCount
        total: Number,
        iceCreamCount: [{
            id: String, // Assuming each ice cream has an 'id'
            name: String,
            price: Number,
            count: Number,
            // Add any other fields that your ice cream objects have
        }],
    },
});
const userSchema = new Schema({
    name:String,
    mobile:String,
})
const Users = mongoose.model('users',userSchema)
const Data = mongoose.model('Data', dataSchema);

app.post('/',async(req,res)=>{
    try {
        const { name,date, value } = req.body; // Destructure name and email from the request body
        console.log("inside post")
        const newData = new Data({ name,date, value }); // Create a new document
        const savedData = await newData.save(); // Save the document to MongoDB
        res.status(201).json(savedData); // Send back the saved data with a 201 status
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving data to the database");
    }
})

app.post('/users', async (req, res) => {
    try {
        const { name, mobile } = req.body; // Destructure name and mobile from the request body
        console.log(req.body)
        // Create a model with the username
        const UserName = mongoose.model(name, dataSchema,name);
        const userData = new Users({name,mobile})
        const userSavedData = await userData.save();
        res.status(201).json(userSavedData)
    } catch (error) {
        console.error(error);
        // Send an error response with status 500
        res.status(500).send("Error saving user data to the database");
    }
});

app.listen(port,()=>{
    console.log('example of listening')
})