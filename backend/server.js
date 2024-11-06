const express = require('express')
const cors = require('cors')
const connection = require('./db')
const authRoutes = require('./routes/authRoutes.js')


const app =  express()
app.use(express.json())
app.use(cors())
require('dotenv').config()

const port = 5000 || process.env.PORT


app.use('/api', authRoutes)


app.listen(port, ()=>{
    console.log(`Server up and running on port ${port}`)
})