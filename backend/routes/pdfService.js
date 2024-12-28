const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const fs = require("fs");


const sendEventPDF = async (user, event) => {
    return new Promise((resolve, reject) => {
        // const tempDir = "./temp";
        const path = require("path");
        const tempDir = path.join(__dirname, "temp");
        const pdfPath = path.join(tempDir, `${user.email}-${event.id}.pdf`);

        console.log(`PDF creation initiated at path: ${pdfPath}`);

        // const pdfPath = `${tempDir}/${user.email}-${event.id}.pdf`;

        // Ensure the temp directory exists
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        const doc = new PDFDocument();
        const stream = fs.createWriteStream(pdfPath);
        doc.pipe(stream);

        // Add content to the PDF
        doc.fontSize(20).text("Event Registration Confirmation", { align: "center" });
        doc.moveDown();
        doc.fontSize(16).text(`Dear ${user.first_name} ${user.last_name},`);
        doc.moveDown();
        doc.fontSize(14).text(`You have successfully registered for the event:`);
        doc.fontSize(18).text(event.title, { underline: true });
        doc.moveDown();
        doc.fontSize(14).text(`Event Details:`);
        doc.text(`Date: ${event.date}`);
        doc.text(`Time: ${event.time}`);
        doc.text(`Venue: ${event.venue}`);
        doc.text(`City: ${event.city}`);
        doc.moveDown();
        doc.text(`Thank you for registering! We look forward to seeing you there.`);
        doc.end();

        // When writing is complete, send the email
        stream.on("finish", async () => {
            console.log(`PDF successfully created at path: ${pdfPath}`);
            try {
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: "Event Registration Confirmation",
                    text: `Hi ${user.first_name},\n\nYour registration for ${event.title} has been confirmed. Please find the attached PDF for event details.\n\nBest regards,\nEvent Team`,
                    attachments: [{ filename: `${event.title}-confirmation.pdf`, path: pdfPath }],
                };

                await transporter.sendMail(mailOptions);

                // Delete the temporary file after successful email
                fs.unlinkSync(pdfPath);

                resolve("Email sent successfully with PDF!");
            } catch (error) {
                reject(error);
            }
        });

        stream.on("error", (err) => {
            reject(err);
        });
    });
};

module.exports = { sendEventPDF }