import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phoneNumber: { type: String, required: true },
    token: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },

});

const User = mongoose.model("User", userSchema);
export default User;
