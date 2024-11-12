const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');

const connection = require('../db.js');
const { sendVerificationEmail } = require('./emailService.js');

router.post('/signup', (req, res) => {

    console.log(req.body)

    const { first_name, last_name, email, password } = req.body;

    const id = uuidv4();
    const verificationToken = uuidv4()

    const sql = 'INSERT INTO users (id, first_name, last_name, email, password, verification_token) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [id, first_name, last_name, email, password, verificationToken]; 

    connection.query(sql, values, async (err, result) => {
        if (err) {
            // Check if the error is related to a duplicate entry (e.g., duplicate email)
            console.log(err.code)
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).send('Email already exists. Please use a different email.');
            }
            // For any other errors, send a generic error message
            return res.status(500).send('Error occurred while creating user');
        }

        const verificationLink = `http://localhost:5000/api/verify-email?token=${verificationToken}`;


        try {
            await sendVerificationEmail(email, first_name, verificationLink);
            res.status(201).json('User created successfully. Please verify your email.');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error occurred while sending verification email');
        }
        // res.status(201).json('User created successfully');
    });
})

module.exports = router