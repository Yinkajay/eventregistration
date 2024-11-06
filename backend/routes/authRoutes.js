const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

const connection = require('../db.js')

router.post('/signup', (req, res) => {

    console.log(req.body)

    const { first_name, last_name, email, password } = req.body;
    
    const userId = uuidv4();

    // SQL query to insert the new user into the database
    const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    const values = [userId, first_name, last_name, email, password]; // Adjust this for hashed passwords if needed

    
    connection.query(sql, values, (err, result) => {
        if (err) {
            // Check if the error is related to a duplicate entry (e.g., duplicate email)
            console.log(err.code)
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send('Email already exists. Please use a different email.');
            }
            // For any other errors, send a generic error message
            return res.status(500).send('Error occurred while creating user');
        }
        // console.log('added user successfully to db')
        res.status(201).json('User created successfully');
    });
})

module.exports = router