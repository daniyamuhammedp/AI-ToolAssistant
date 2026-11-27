
import { generateAIResponse } from "../services/aiService.js";

import {
    getSession,
    addMessage,
    getRecentHistory
} from "../utils/sessionManager.js";

export const handleChat = async (req, res, next) => {
    try {
        console.log("1. Chat controller reached");

        const { message, sessionId } = req.body;

        if (
            typeof message !== "string" ||
            !message.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid message."
            });
        }

        if (
            typeof sessionId !== "string" ||
            !sessionId.trim() ||
            sessionId.length > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid session ID."
            });
        }

        // Retrieve this conversation's history
        getSession(sessionId);

        const history = getRecentHistory(sessionId);

        console.log("2. Previous messages:", history.length);

        // Send current message and previous history to AI
        const answer = await generateAIResponse(
            message,
            history
        );

        // Save current user message
        addMessage(sessionId, {
            role: "user",
            content: message
        });

        // Save assistant response
        addMessage(sessionId, {
            role: "assistant",
            content: answer
        });

        console.log("3. Conversation saved");

        res.status(200).json({
            success: true,
            sessionId,
            userMessage: message,
            answer
        });

    } catch (error) {
        console.error("Chat error:", error.message);
        next(error);
    }
};
