const mysql = require('mysql2');
require('dotenv').config()

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost', // or '127.0.0.1'
  user: 'root', // your MySQL root username
  password: process.env.DB_PASSWORD, // your MySQL root password
  database: 'user_registration' // the database you created earlier
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = connection;
