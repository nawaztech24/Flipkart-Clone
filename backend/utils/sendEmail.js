const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        console.log("EMAIL FUNCTION CALLED");

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            connectionTimeout: 5000, // prevent hanging
        });

        console.log("SENDING EMAIL...");

        const info = await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            html: options.message,
        });

        console.log("EMAIL SENT SUCCESS:", info.response);

    } catch (error) {
        console.log("EMAIL ERROR FULL:", error.message);
    }
};

module.exports = sendEmail;