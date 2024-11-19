const express = require('express')
const router = express.Router()

const connection = require('../db.js')

router.get('/events', (req, res) => {
    const sql = 'SELECT * FROM events ORDER BY date, time';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).send('Error fetching events');
        }
        res.status(200).json(results);
    });
})

module.exports = router