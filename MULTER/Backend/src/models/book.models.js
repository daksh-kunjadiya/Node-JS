import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: ture },
    coverImage: { type: String, required: ture }
}, { timestamps: true })

export const Book = mongoose.model('Book', bookSchema)