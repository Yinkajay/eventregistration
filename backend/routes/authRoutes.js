const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

const connection = require('../db.js');
const { sendVerificationEmail } = require('./emailService.js');

const JWT_SECRET = process.env.JWT_SECRET

router.get('/verify', async (req, res) => {
    const token = req.query.token;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const firstName = decoded.firstName
        const userId = decoded.userId;
        console.log(firstName)
        console.log(token)
        const sql = 'UPDATE users SET is_verified = 1 WHERE id = ?';
        connection.query(sql, [userId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating verification status');
            }
            if (result.affectedRows === 0) {
                return res.status(400).send('User not found');
            }
            res.send('Email verified successfully');
        });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(400).send('Invalid or expired token')
    }
})

router.post('/signup', (req, res) => {

    console.log(req.body)

    const { first_name, last_name, email, password } = req.body;

    const id = uuidv4();
    // const verificationToken = uuidv4()

    const sql = 'INSERT INTO users (id, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)';
    const values = [id, first_name, last_name, email, password];

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

        const verificationToken = jwt.sign({ userId: id, firstName: first_name, lastName: last_name }, JWT_SECRET, { expiresIn: '1h' })
        const verificationLink = `http://localhost:5173/verify-email?token=${verificationToken}`;


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