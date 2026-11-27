import { executeTool } from "../utils/toolRegistry.js";
import { detectToolRequest } from "./toolRouter.js";
import { formatToolResult } from "./toolFormatter.js";

const unsupportedMessage =
  "I couldn't match that request to one of my tools. Try asking me to calculate, check weather, search the web or notes, or look up products or student marks.";

export const handleToolRequest = async (message) => {
  const request = detectToolRequest(message);

  if (!request) {
    return unsupportedMessage;
  }

  const result = await executeTool(request.name, request.args);
  return formatToolResult(request.name, result, message);
};
