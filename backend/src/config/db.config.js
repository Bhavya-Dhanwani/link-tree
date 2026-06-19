import mongoose from "mongoose";
import { MONGO_URI } from "./env.config.js";

async function connectDB() {
    if (!MONGO_URI) {
        throw new Error("MONGO_URI is not defined");
    }

    try {
        // Keep database startup explicit so server boot fails loudly on connection errors.
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
}

export default connectDB;
