import { searchFiles } from "./src/tools/fileSearch.tool.js";

const result = await searchFiles({
  query: "JavaScript functions"
});

console.log(JSON.stringify(result, null, 2));