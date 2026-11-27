
import { testDatabaseConnection } from "./src/config/database.js";

try {
  const result = await testDatabaseConnection();

  console.log("MySQL connected successfully!");
  console.log(result);
} catch (error) {
  console.log("MySQL connection failed.");
  console.log("Full error:", error);
  console.log("Error name:", error?.name);
  console.log("Error message:", error?.message);
  console.log("Error code:", error?.code);
  console.log("Error stack:", error?.stack);
}
