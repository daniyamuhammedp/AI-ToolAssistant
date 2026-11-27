import test from "node:test";
import assert from "node:assert/strict";
import { detectToolRequest } from "./toolRouter.js";

test("routes percentage calculations to the calculator tool", () => {
  assert.deepEqual(detectToolRequest("Calculate 25% of 840"), {
    name: "calculate",
    args: { operation: "multiply", numbers: [0.25, 840] }
  });
});

test("routes arithmetic expressions including subtraction", () => {
  assert.deepEqual(detectToolRequest("What is 18 - 7?"), {
    name: "calculate",
    args: { operation: "subtract", numbers: [18, 7] }
  });
});

test("routes compact addition expressions", () => {
  assert.deepEqual(detectToolRequest("20+20"), {
    name: "calculate",
    args: { operation: "add", numbers: [20, 20] }
  });
});

test("extracts a city for weather requests", () => {
  assert.deepEqual(detectToolRequest("What's the weather in Delhi?"), {
    name: "get_weather",
    args: { city: "Delhi" }
  });
});

test("routes product category requests before generic product lookups", () => {
  assert.deepEqual(detectToolRequest("Show products in electronics"), {
    name: "get_products_by_category",
    args: { category: "electronics" }
  });
});

test("routes all-products requests to the unfiltered database tool", () => {
  assert.deepEqual(detectToolRequest("Show all products from the database"), {
    name: "get_all_products",
    args: {}
  });
});

test("does not include a time reference in the weather city", () => {
  assert.deepEqual(detectToolRequest("Weather in New York today"), {
    name: "get_weather",
    args: { city: "New York" }
  });
});

test("routes supported utility requests to their matching tools", () => {
  assert.deepEqual(detectToolRequest("Convert 32 Celsius to Fahrenheit"), {
    name: "convert_celsius_to_fahrenheit",
    args: { celsius: 32 }
  });
  assert.deepEqual(detectToolRequest("Calculate age from birth year 1990"), {
    name: "calculate_age",
    args: { birthYear: 1990 }
  });
  assert.deepEqual(detectToolRequest("Generate a random number between 2 and 9"), {
    name: "generate_random_number",
    args: { min: 2, max: 9 }
  });
  assert.deepEqual(detectToolRequest("Find the average of numbers 2 and 4"), {
    name: "process_numbers",
    args: { numbers: [2, 4] }
  });
});

test("routes explicit student and internet searches", () => {
  assert.deepEqual(detectToolRequest("Find students with marks above 80"), {
    name: "get_students_above_marks",
    args: { minimumMarks: 80 }
  });
  assert.deepEqual(detectToolRequest("Search the internet for climate news"), {
    name: "search_internet",
    args: { query: "climate news" }
  });
});

test("extracts the topic from local notes searches", () => {
  assert.deepEqual(detectToolRequest("Search my notes for JavaScript concepts"), {
    name: "search_files",
    args: { query: "JavaScript concepts" }
  });
});

test("does not choose a tool for unmatched requests", () => {
  assert.equal(detectToolRequest("Tell me a story"), null);
});
