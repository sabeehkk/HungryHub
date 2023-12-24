import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 7,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
})
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;