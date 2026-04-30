const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        console.log("MAIL:", process.env.SMTP_MAIL);
        console.log("PASS:", process.env.SMTP_PASSWORD ? "SET" : "NOT SET");

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            html: options.message,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("EMAIL SENT SUCCESS:", info.response);

    } catch (error) {
        console.log("EMAIL ERROR FULL:", error);
    }
};

module.exports = sendEmail;