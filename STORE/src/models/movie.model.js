import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "movie title is required"],
        trim: true
    },
    director: {
        type: String,
        required: [true, "movie director is required"],
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: [0, 'rating must be positive']
    },
    isAwardWinner: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Movie = mongoose.model("Movie", MovieSchema);
