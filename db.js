const mongoose = require('mongoose')
// const mongoUrl = 'mongodb://127.0.0.1:27017/voting'
require('dotenv').config()
const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl)

const db = mongoose.connection;

db.on('connected',()=>
{
    console.log('connected to mongodb')
})

db.on('disconnected',()=>
{
        console.log('disconnected to mongodb')
})

db.on('error',(error)=>
{
            console.log('connection error occured',error)
})

module.exports = db