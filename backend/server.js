// Importing modules
import createApp from "./src/app.js";
import connectDB from "./src/config/db.config.js";
import { PORT } from "./src/config/env.config.js";

// Starting the server
async function startServer() {
    const app = await createApp();

    // Startting the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();