// utils/mail.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendMail(to, subject, html) {
    try {
        return await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, html });
    } catch (err) {
        console.error('mail error', err);
        throw err;
    }
}

module.exports = sendMail;
