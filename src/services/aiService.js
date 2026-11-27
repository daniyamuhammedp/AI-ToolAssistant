
import { AI_MODEL, getGroqClient } from "../config/aiConfig.js";
import { toolDefinitions, executeTool } from "../utils/toolRegistry.js";

const systemPrompt = `
You are a helpful AI assistant with conversational memory.

Remember the information shared earlier in the current conversation.
Use previous messages to understand follow-up questions.

Answer general questions directly and use available tools whenever
a request needs calculation, weather, internet information,
database records, local notes, or JavaScript utilities.

Use only the supplied tools for database access.
Never write SQL, modify records, or invent tool results.
After a tool returns, use its actual result to answer clearly.
If a tool returns no records, say so.
If the request is unclear or a tool cannot fulfill it,
explain that to the user.
`;

export const createAIResponse = async ({
    client,
    model,
    message,
    history = [],
    tools = toolDefinitions,
    execute = executeTool,
    maxAttempts = 5
}) => {
    const messages = [
        { role: "system", content: systemPrompt },

        // Previous conversation messages
        ...history,

        // Current user message
        { role: "user", content: message }
    ];

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        const response = await client.chat.completions.create({
            model,
            messages,
            tools,
            tool_choice: "auto"
        });

        const assistantMessage = response.choices[0]?.message;

        if (!assistantMessage) {
            throw new Error("The AI returned an empty response.");
        }

        if (!assistantMessage.tool_calls?.length) {
            if (typeof assistantMessage.content !== "string") {
                throw new Error("The AI returned no text response.");
            }

            return assistantMessage.content;
        }

        messages.push(assistantMessage);

        for (const toolCall of assistantMessage.tool_calls) {
            let args;

            try {
                args = JSON.parse(toolCall.function.arguments);
            } catch (error) {
                throw new Error(
                    "The AI returned invalid tool arguments.",
                    { cause: error }
                );
            }

            const result = await execute(
                toolCall.function.name,
                args
            );

            messages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: JSON.stringify(result)
            });
        }
    }

    throw new Error("Maximum tool-calling attempts reached.");
};

export const generateAIResponse = (message, history = []) =>
    createAIResponse({
        client: getGroqClient(),
        model: AI_MODEL,
        message,
        history
    });
