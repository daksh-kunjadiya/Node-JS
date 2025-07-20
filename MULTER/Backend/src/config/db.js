import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Mongodb connected')
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}