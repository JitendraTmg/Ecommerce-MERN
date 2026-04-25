import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const verifyEmail = (token, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
    const mailConfiguration = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking the following link: http://localhost:5173/verify/${token}`
    };

    transporter.sendMail(mailConfiguration, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, message: 'Failed to send verification email' });
        } else {
            console.log('Email sent successfully:', info.response);
            return res.status(200).json({ success: true, message: 'Verification email sent successfully' });
        }
    });
};



