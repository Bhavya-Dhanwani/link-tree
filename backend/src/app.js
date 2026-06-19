// Importing modules
import express from "express";
import setMiddlewares from "./middlewares/index.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import ApiError from "./utils/ApiError.js";
import ApiResponse from "./utils/ApiResponse.js";

function createApp() {
    const app = express();

    // Setting up middlewares
    setMiddlewares(app);

    // Making the health check route
    app.get("/health", (req, res) => {
        return ApiResponse(res, 200, "Server is healthy");
    });

    // Send unknown routes to the centralized error handler.
    app.use((req, res, next) => {
        next(new ApiError(404, `Route not found: ${req.originalUrl}`));
    });

    // Setting up error handler
    app.use(errorHandler);

    return app;
}

// Exporting app creator
export default createApp;
