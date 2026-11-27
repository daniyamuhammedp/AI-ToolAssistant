
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to AI Tool Assistant!");
});

// Health check API
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AI Tool Assistant server is healthy"
    });
});

// Connect chat routes
app.use("/api", chatRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

// Central error handler (must be last)
app.use(errorHandler);

export default app;
