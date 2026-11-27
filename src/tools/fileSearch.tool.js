
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notesDirectory = path.resolve(
  __dirname,
  "../../data/notes"
);

export const searchFiles = async ({ query }) => {

  if (!query || typeof query !== "string" || !query.trim()) {
    throw new Error("Please provide a valid search query.");
  }

  const files = await fs.readdir(notesDirectory);

  const textFiles = files.filter(file =>
    file.toLowerCase().endsWith(".txt")
  );

  const searchWords = query
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 2);

  const results = [];

  for (const file of textFiles) {

    const filePath = path.join(notesDirectory, file);

    const content = await fs.readFile(filePath, "utf-8");

    const lines = content.split(/\r?\n/);

    const matchingLines = lines.filter(line => {
      const lowerLine = line.toLowerCase();

      return searchWords.some(word =>
        lowerLine.includes(word)
      );
    });

    if (matchingLines.length > 0) {
      results.push({
        fileName: file,
        matches: matchingLines
      });
    }
  }

  return {
    query,
    results,
    totalFilesSearched: textFiles.length,
    message: results.length > 0
      ? "Matching notes found."
      : "No matching notes found."
  };
};
