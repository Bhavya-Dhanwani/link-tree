import mongoose from "mongoose";

function connectDB() {

    try {

        // Connect to MongoDB using the connection string from environment variables
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");

    } catch (error) {

        // Handle connection error
        console.error("MongoDB connection failed:", error.message);

    }

}

export default connectDB;