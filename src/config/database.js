
import mysql from "mysql2/promise";
import "dotenv/config";

export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3308),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "ai_assistant_db",

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const testDatabaseConnection = async () => {
  const connection = await db.getConnection();

  try {
    const [rows] = await connection.query(
      "SELECT 1 AS connected"
    );

    return rows[0];
  } finally {
    connection.release();
  }
};
