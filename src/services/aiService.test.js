import test from "node:test";
import assert from "node:assert/strict";
import { createAIResponse } from "./aiService.js";

test("returns a direct LLM response when no tool is needed", async () => {
  const client = {
    chat: {
      completions: {
        create: async () => ({
          choices: [{ message: { content: "Hello!" } }]
        })
      }
    }
  };

  const answer = await createAIResponse({
    client,
    model: "test-model",
    message: "Say hello",
    tools: []
  });

  assert.equal(answer, "Hello!");
});

test("executes an LLM-requested tool and sends its result back to the LLM", async () => {
  const calls = [];
  const client = {
    chat: {
      completions: {
        create: async (request) => {
          calls.push(request);
          if (calls.length === 1) {
            return {
              choices: [{
                message: {
                  role: "assistant",
                  content: null,
                  tool_calls: [{
                    id: "call-1",
                    type: "function",
                    function: {
                      name: "calculate",
                      arguments: '{"numbers":[2,3]}'
                    }
                  }]
                }
              }]
            };
          }

          return {
            choices: [{ message: { content: "2 + 3 = 5" } }]
          };
        }
      }
    }
  };

  const answer = await createAIResponse({
    client,
    model: "test-model",
    message: "What is 2 + 3?",
    tools: [{ type: "function" }],
    execute: async (name, args) => {
      assert.equal(name, "calculate");
      assert.deepEqual(args, { numbers: [2, 3] });
      return { result: 5 };
    }
  });

  assert.equal(answer, "2 + 3 = 5");
  assert.deepEqual(JSON.parse(calls[1].messages.at(-1).content), { result: 5 });
});

test("reports invalid tool arguments", async () => {
  const client = {
    chat: {
      completions: {
        create: async () => ({
          choices: [{
            message: {
              tool_calls: [{
                id: "call-1",
                function: { name: "calculate", arguments: "not-json" }
              }]
            }
          }]
        })
      }
    }
  };

  await assert.rejects(
    createAIResponse({
      client,
      model: "test-model",
      message: "calculate",
      tools: []
    }),
    { message: "The AI returned invalid tool arguments." }
  );
});
