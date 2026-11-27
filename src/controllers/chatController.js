
import { handleToolRequest } from "../services/toolService.js";

export const handleChat = async (req, res, next) => {
    try {
        console.log("1. Chat controller reached");

        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please provide a message."
            });
        }

        const answer = await handleToolRequest(message);

        res.status(200).json({
            success: true,
            userMessage: message,
            answer
        });

    } catch (error) {
        console.error("Chat error:", error.message);
        next(error);
    }
};
