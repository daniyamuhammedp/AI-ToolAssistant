
import { calculate } from "../tools/calculator.tool.js";
import { getWeather } from "../tools/weather.tool.js";
import { searchInternet } from "../tools/search.tool.js";
import { searchFiles } from "../tools/fileSearch.tool.js";

import {
    getStudentsAboveMarks,
    getAllProducts,
    getProductsByCategory,
} from "../tools/database.tool.js";

import {
    getCurrentDateTime,
    calculateAge,
    convertCelsiusToFahrenheit,
    convertFahrenheitToCelsius,
    generateRandomNumber,
    processNumbers
} from "../tools/javascript.tool.js";

export const toolDefinitions = [
    {
        type: "function",
        function: {
            name: "calculate",
            description: "Performs addition, subtraction, multiplication, and division.",
            parameters: {
                type: "object",
                properties: {
                    operation: {
                        type: "string",
                        enum: ["add", "subtract", "multiply", "divide"]
                    },
                    numbers: {
                        type: "array",
                        items: { type: "number" },
                        minItems: 2
                    }
                },
                required: ["operation", "numbers"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "get_weather",
            description: "Gets current weather information for a city.",
            parameters: {
                type: "object",
                properties: {
                    city: { type: "string" }
                },
                required: ["city"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "search_internet",
            description: "Searches the internet for recent information.",
            parameters: {
                type: "object",
                properties: {
                    query: { type: "string" }
                },
                required: ["query"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "get_students_above_marks",
            description: "Gets students whose marks are above a specified minimum mark.",
            parameters: {
                type: "object",
                properties: {
                    minimumMarks: { type: "number" }
                },
                required: ["minimumMarks"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "get_all_products",
            description: "Gets all products from the products database table.",
            parameters: {
                type: "object",
                properties: {},
                required: []
            }
        }
    },
    {
        type: "function",
        function: {
            name: "get_products_by_category",
            description: "Gets products belonging to a specified category.",
            parameters: {
                type: "object",
                properties: {
                    category: { type: "string" }
                },
                required: ["category"]
            }
        }
    },


{
        type: "function",
        function: {
            name: "get_current_datetime",
            description: "Gets the current date and time.",
            parameters: {
                type: "object",
                properties: {},
                required: []
            }
        }
    },
    {
        type: "function",
        function: {
            name: "calculate_age",
            description: "Calculates age using a birth year.",
            parameters: {
                type: "object",
                properties: {
                    birthYear: { type: "number" }
                },
                required: ["birthYear"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "convert_celsius_to_fahrenheit",
            description: "Converts Celsius temperature to Fahrenheit.",
            parameters: {
                type: "object",
                properties: {
                    celsius: { type: "number" }
                },
                required: ["celsius"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "convert_fahrenheit_to_celsius",
            description: "Converts Fahrenheit temperature to Celsius.",
            parameters: {
                type: "object",
                properties: {
                    fahrenheit: { type: "number" }
                },
                required: ["fahrenheit"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "generate_random_number",
            description: "Generates a random integer between a minimum and maximum.",
            parameters: {
                type: "object",
                properties: {
                    min: { type: "integer" },
                    max: { type: "integer" }
                },
                required: ["min", "max"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "process_numbers",
            description: "Calculates the total, average, minimum, and maximum of an array of numbers.",
            parameters: {
                type: "object",
                properties: {
                    numbers: {
                        type: "array",
                        items: { type: "number" }
                    }
                },
                required: ["numbers"]
            }
        }
    },
{
  type: "function",
  function: {
    name: "search_files",
    description: "Searches local text notes for information matching a query.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "The topic or words to search for in local notes."
        }
      },
      required: ["query"]
    }
  }
}

];

const toolFunctions = {
    calculate,
    get_weather: getWeather,
    search_internet: searchInternet,
    get_students_above_marks: getStudentsAboveMarks,
    get_all_products: getAllProducts,
    get_products_by_category: getProductsByCategory,
    get_current_datetime: getCurrentDateTime,
    calculate_age: calculateAge,
    convert_celsius_to_fahrenheit: convertCelsiusToFahrenheit,
    convert_fahrenheit_to_celsius: convertFahrenheitToCelsius,
    generate_random_number: generateRandomNumber,
    process_numbers: processNumbers,
    search_files: searchFiles
};

export const executeTool = async (name, args) => {
    const tool = toolFunctions[name];

    if (!tool) {
        throw new Error(`Unknown tool: ${name}`);
    }

    return await tool(args);
};

export const getAvailableTools = () =>
    toolDefinitions.map(item => ({
        name: item.function.name,
        description: item.function.description
    }));
