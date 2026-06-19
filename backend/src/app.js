// Importing modules
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

function createApp() {

    // Making the app
    const app = express();

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
