
import { db } from "../config/database.js";

// 1. Get students who scored above a given mark
export const getStudentsAboveMarks = async ({ minimumMarks }) => {
  if (
    typeof minimumMarks !== "number" ||
    !Number.isFinite(minimumMarks) ||
    minimumMarks < 0 ||
    minimumMarks > 100
  ) {
    throw new Error("Please provide marks between 0 and 100.");
  }

  const [students] = await db.execute(
    "SELECT id, name, age, course, marks FROM students WHERE marks > ? ORDER BY marks DESC",
    [minimumMarks]
  );

  return students;
};

// 2. Get all products
export const getAllProducts = async () => {
  const [products] = await db.execute(
    "SELECT id, name, category, price, stock FROM products"
  );

  return products;
};

// 3. Get products by category
export const getProductsByCategory = async ({ category }) => {
  if (typeof category !== "string" || !category.trim()) {
    throw new Error("Please provide a valid product category.");
  }

  const [products] = await db.execute(
    "SELECT id, name, category, price, stock FROM products WHERE category = ?",
    [category.trim()]
  );

  return products;
};
