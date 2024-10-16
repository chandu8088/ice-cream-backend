const express = require('express')
const app = express()
const port = 3005
const mongoose = require('mongoose')
const {Cat} = require('./Model')
const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://chandu:Cbk%408088232120@cluster0.poroy.mongodb.net/local`)
    console.log(`the db is connected with ${mongoose.connection.host}`);
}
connectDB();
app.get('/',async(req,res)=>{
    const cat = new Cat({
        name:"chandu"
    })
    const data = await cat.save() 
    res.send(data)
})

app.listen(port,()=>{
    console.log('example of listening')
})