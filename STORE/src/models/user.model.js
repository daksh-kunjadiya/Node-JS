import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            required: true, 
            unique: true,
            trim: true
        }
    },
    { timestamps: true }
);

export default User = mongoose.model("User", useSchema);

