import test from "node:test";
import assert from "node:assert/strict";
import { formatToolResult } from "./toolFormatter.js";

test("formats calculator output as a readable equation", () => {
  assert.equal(
    formatToolResult("calculate", {
      operation: "add",
      numbers: [20, 20],
      result: 40
    }, "20+20"),
    "20 + 20 = 40"
  );
});

test("formats percentage calculations clearly", () => {
  assert.equal(
    formatToolResult("calculate", {
      operation: "multiply",
      numbers: [0.25, 840],
      result: 210
    }, "Calculate 25% of 840"),
    "25% of 840 = 210"
  );
});

test("keeps other tool results unchanged", () => {
  assert.equal(
    formatToolResult("get_current_datetime", { date: "11/27/2026" }, "What date is it today?"),
    'get_current_datetime result:\n{\n  "date": "11/27/2026"\n}'
  );
});
