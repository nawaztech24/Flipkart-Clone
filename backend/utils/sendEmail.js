const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,              
        port: Number(process.env.SMTP_PORT),      
        secure: false,                            
        requireTLS: true,                         
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,          
        },
    });

    // 🔍 optional debug (deploy ke baad hata dena)
    console.log("MAIL:", process.env.SMTP_MAIL);
    console.log("PASS:", process.env.SMTP_PASSWORD ? "SET" : "NOT SET");

    
    await transporter.verify();

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ EMAIL SENT:", info.messageId);
};

module.exports = sendEmail;