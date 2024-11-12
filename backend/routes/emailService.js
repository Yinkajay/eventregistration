const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL_USER, // Set this in your .env file
        pass: process.env.EMAIL_PASS  // Set this in your .env file
    }
});


const sendVerificationEmail = (email, firstName, verificationLink) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Event Master Email Verification',
        html: `<p>Welcome, ${firstName}! Please verify your email by clicking <a href="${verificationLink}">here</a>. This link expires in 1 hour!</p>`
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };