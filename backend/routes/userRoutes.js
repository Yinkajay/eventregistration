const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const connection = require('../db.js')

const JWT_SECRET = process.env.JWT_SECRET



router.get('/user', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expect "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Validate and decode the token
        const userId = decoded.userId;

        // Fetch user info from the database
        connection.query('SELECT id, first_name, last_name, email FROM users WHERE id = ?', [userId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching user data' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(results[0]); // Send user-specific data
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }

    
})