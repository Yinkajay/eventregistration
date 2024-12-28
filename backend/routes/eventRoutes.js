const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const {sendEventPDF} = require('./pdfService.js')
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

router.get('/events/:id', (req, res) => {
    const eventId = req.params.id;
  
    const sql = 'SELECT * FROM events WHERE id = ?';
    connection.query(sql, [eventId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error fetching event details');
      }
  
      if (result.length === 0) {
        return res.status(404).send('Event not found');
      }
  
      res.json(result[0]); // Send back the event details
    });
  });

  // router.post("/events/register", (req, res) => {
  //   const { userId, eventId } = req.body;
  //   // console.log(req.headers)
  //   const token = req.headers.authorization?.split(" ")[1];
  
  //   if (!token) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   }
  
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     const userId = decoded.id;
  
  //     // Check if the user is already registered for the event
  //     const checkSql = "SELECT * FROM event_registrations WHERE user_id = ? AND event_id = ?";
  //     connection.query(checkSql, [userId, eventId], (checkErr, results) => {
  //       if (checkErr) {
  //         console.log(checkErr);
  //         return res.status(500).send("Error checking registration");
  //       }
  
  //       if (results.length > 0) {
  //         console.log('allready there')
  //         return res.status(400).json({ message: "You are already registered for this event." });
  //       }
  
  //       // Register the user for the event
  //       const insertSql = "INSERT INTO event_registrations (user_id, event_id) VALUES (?, ?)";
  //       connection.query(insertSql, [userId, eventId], (insertErr) => {
  //         if (insertErr) {
  //           console.log(insertErr);
  //           return res.status(500).send("Error registering for event");
  //         }
  
  //         // Send a confirmation PDF to the user
  //         // sendEventPDF(decoded.email, eventId); // Function to send the PDF
  //         res.status(201).json({ message: "Successfully registered for the event." });
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).json({ message: "Invalid or expired token" });
  //   }
  // });


router.post("/events/register", (req, res) => {
  const { eventId } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Check if the user is already registered for the event
    const checkSql =
      "SELECT * FROM event_registrations WHERE user_id = ? AND event_id = ?";
    connection.query(checkSql, [userId, eventId], (checkErr, results) => {
      if (checkErr) {
        console.log(checkErr);
        return res.status(500).send("Error checking registration");
      }

      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "You are already registered for this event." });
      }

      // Register the user for the event
      const insertSql =
        "INSERT INTO event_registrations (user_id, event_id) VALUES (?, ?)";
      connection.query(insertSql, [userId, eventId], async (insertErr) => {
        if (insertErr) {
          console.log(insertErr);
          return res.status(500).send("Error registering for event");
        }

        // Fetch user and event details
        const userQuery =
          "SELECT first_name, last_name, email FROM users WHERE id = ?";
        const eventQuery = "SELECT * FROM events WHERE id = ?";

        connection.query(userQuery, [userId], (userErr, userResults) => {
          if (userErr || userResults.length === 0) {
            console.log(userErr);
            return res.status(500).send("Error fetching user details");
          }

          connection.query(eventQuery, [eventId], async (eventErr, eventResults) => {
            if (eventErr || eventResults.length === 0) {
              console.log(eventErr);
              return res.status(500).send("Error fetching event details");
            }

            const user = userResults[0];
            const event = eventResults[0];

            try {
              await sendEventPDF(user, event);
              res
                .status(201)
                .json({ message: "Successfully registered for the event." });
            } catch (emailErr) {
              console.error("Error sending email:", emailErr);
              res
                .status(500)
                .json({ message: "Registration successful, but email failed" });
            }
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});


module.exports = router