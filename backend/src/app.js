// Importing modules
import express from "express";
import setMiddlewares from "./middlewares/index.middleware.js";
import connectDB from "./config/db.config.js";

async function createApp() {

    // Making the app
    const app = express();

    // Setting up middlewares
    setMiddlewares(app);

    // connecting to the database
    await connectDB();

    // Making the health check route
    app.get("/health", (req, res) => {
        res.status(200).json({
            success: true,
            message: "Server is healthy"
        });
    });

    return app;
}

export default createApp;
