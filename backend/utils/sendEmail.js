const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        console.log("EMAIL FUNCTION CALLED");

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
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
        console.log("EMAIL ERROR FULL:", error);
    }
};

module.exports = sendEmail;