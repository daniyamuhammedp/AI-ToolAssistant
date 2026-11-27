import "dotenv/config";
import Groq from "groq-sdk";

export const AI_MODEL =
  process.env.AI_MODEL || "llama-3.3-70b-versatile";

let groq;

export const getGroqClient = () => {
  if (!process.env.AI_API_KEY) {
    throw new Error("AI_API_KEY is missing.");
  }

  if (!groq) {
    groq = new Groq({ apiKey: process.env.AI_API_KEY });
  }

  return groq;
};
