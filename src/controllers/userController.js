import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyEmail } from '../emailVerify/verifyEmail.js';
import User from '../models/userModel.js';


export const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body;

        if (!firstName || !lastName || !email || !password || !phoneNumber) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const existingUser = await User.find({
            $or: [{ email }, { phoneNumber }],
        });

        if (existingUser.length > 0) {
            return res.status(400).json({ success: false, message: 'Email or Phone Number already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ firstName, lastName, email, password: hashedPassword, phoneNumber });

        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '10min' });
        verifyEmail(token, email); //send email here
        newUser.token = token;

        await newUser.save();

        return res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });

    } catch (error) {
        console.error('Error in signUp:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



export const verify = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1]; //Bearer token

        ;

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(400).json({ success: false, message: "The registration token has expired" });
            }
            return res.status(400).json({ success: false, message: "Token verification failed" });
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, message: "Email already verified" });
        }

        user.isVerified = true;
        user.token = null;
        await user.save();

        return res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        console.error("Error in verifyEmail:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });

    };
}