const express = require('express')
const cors = require('cors')
const connection = require('./db')


const app =  express()
app.use(cors())
require('dotenv').config()

const port = 5000 || process.env.PORT


app.post('/api/signup', (req,res)=>{
    console.log(req.body)
})




app.listen(port, ()=>{
    console.log('Server up and running')
})