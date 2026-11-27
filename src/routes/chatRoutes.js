import express from "express";
import { handleChat } from "../controllers/chatController.js";
import { getAvailableTools } from "../utils/toolRegistry.js";

const router = express.Router();

// GET /api/tools
router.get("/tools", (req, res) => {
    res.status(200).json({
        success: true,
        tools: getAvailableTools()
    });
});

// POST /api/chat
router.post("/chat", handleChat);

export default router;