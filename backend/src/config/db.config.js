import mongoose from "mongoose";
import { MONGO_URI } from "./env.config.js";
import dns from "dns";

// Setting custom DNS servers to avoid potential DNS resolution issues with MongoDB Atlas
dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {

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
