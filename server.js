const express = require('express')
const db = require('./db')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const userRoutes = require('./routes/userRoutes')
const candidateRoutes = require('./routes/candidateRoutes')
app.use('/user',userRoutes)
app.use('/candidate',candidateRoutes)
app.listen(port,()=>{
    console.log('listening to port of 3000')
})