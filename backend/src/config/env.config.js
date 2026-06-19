// Importing modules
import { config } from "dotenv";

// Configuring environment variables
config();

// Exporting environment variables
export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";