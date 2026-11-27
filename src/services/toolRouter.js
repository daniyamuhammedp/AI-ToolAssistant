const numberPattern = /[-+]?(?:\d+(?:\.\d*)?|\.\d+)/g;

const getNumbers = (text) => (text.match(numberPattern) || []).map(Number);

const cleanQuery = (text, pattern) =>
  text.replace(pattern, "").replace(/[?.,!]+$/g, "").trim();

export const detectToolRequest = (message) => {
  const text = message.trim();
  const normalized = text.toLowerCase();
  const numbers = getNumbers(text);

  if (/\b(celsius|centigrade|°c)\b/.test(normalized) && /\b(to|into|in)\s*(fahrenheit|°f)\b/.test(normalized)) {
    return numbers.length ? { name: "convert_celsius_to_fahrenheit", args: { celsius: numbers[0] } } : null;
  }

  if (/\b(fahrenheit|°f)\b/.test(normalized) && /\b(to|into|in)\s*(celsius|centigrade|°c)\b/.test(normalized)) {
    return numbers.length ? { name: "convert_fahrenheit_to_celsius", args: { fahrenheit: numbers[0] } } : null;
  }

  if (/\b(age|how old)\b/.test(normalized) && /\b(born|birth|year)\b/.test(normalized)) {
    const birthYear = text.match(/\b(?:19|20)\d{2}\b/);
    return birthYear ? { name: "calculate_age", args: { birthYear: Number(birthYear[0]) } } : null;
  }

  if (/\b(date|time)\b/.test(normalized) && /\b(now|today|current|right now)\b/.test(normalized)) {
    return { name: "get_current_datetime", args: {} };
  }

  if (/\b(random|randomly)\b/.test(normalized) && /\b(number|integer)\b/.test(normalized)) {
    return numbers.length >= 2
      ? { name: "generate_random_number", args: { min: numbers[0], max: numbers[1] } }
      : null;
  }

  if (/\b(process|analyze|analyse|statistics|average|mean|maximum|minimum)\b/.test(normalized) &&
      /\b(numbers|values|these)\b/.test(normalized)) {
    return numbers.length ? { name: "process_numbers", args: { numbers } } : null;
  }

  if (/\b(students?|marks|scores?|grades?)\b/.test(normalized) &&
      /\b(above|over|greater than|more than|higher than)\b/.test(normalized)) {
    return numbers.length
      ? { name: "get_students_above_marks", args: { minimumMarks: numbers[0] } }
      : null;
  }

  if (/\b(products?|inventory)\b/.test(normalized) &&
      /\b(all|every|list|show|display)\b/.test(normalized) &&
      /\b(database|inventory)\b/.test(normalized)) {
    return { name: "get_all_products", args: {} };
  }

  if (/\bproducts?\b/.test(normalized) && /\b(category|in|under|from)\b/.test(normalized)) {
    const categoryMatch = text.match(/\b(?:category(?:\s+(?:of|is))?|products?\s+(?:in|under|from))\s+(.+?)\s*$/i);
    if (categoryMatch) {
      const category = categoryMatch[1]
        .replace(/\b(?:products?|please|for me)\b.*$/i, "")
        .replace(/[?.,!]+$/g, "")
        .trim();
      return category ? { name: "get_products_by_category", args: { category } } : null;
    }
  }

  if (/\b(products?|inventory)\b/.test(normalized) &&
      /\b(all|every|list|show|display)\b/.test(normalized)) {
    return { name: "get_all_products", args: {} };
  }

  if (/\b(weather|temperature|forecast)\b/.test(normalized)) {
    const cityMatch = text.match(/\b(?:weather|forecast|temperature)\b.*?\b(?:in|for|at)\s+([a-z][a-z\s-]*)/i);
    const city = cityMatch?.[1].trim().replace(/\s+(?:today|tomorrow|currently|right now)$/i, "");
    return city ? { name: "get_weather", args: { city } } : null;
  }

  if (/\b(notes?|files?)\b/.test(normalized) &&
      /\b(search|find|look|in|about)\b/.test(normalized)) {
    const query = cleanQuery(
      text,
      /\b(?:search|find|look(?:\s+for)?)\b|\b(?:my\s+)?(?:local\s+)?(?:notes?|files?)\b|\b(?:for|about|in)\b/gi
    );
    return query ? { name: "search_files", args: { query } } : null;
  }

  if (/\b(search|look up|find|latest news|current events|recent news)\b/.test(normalized) &&
      /\b(web|internet|online|news|current events)\b/.test(normalized)) {
    const query = cleanQuery(
      text,
      /\b(?:search(?:\s+the)?|look\s+up|find)\b|\b(?:the\s+)?(?:web|internet|online)\b|\b(?:for|about)\b/gi
    );
    return query ? { name: "search_internet", args: { query } } : null;
  }

  const percentMatch = text.match(/([-+]?\d+(?:\.\d+)?)\s*%\s*(?:of)\s*([-+]?\d+(?:\.\d+)?)/i);
  if (percentMatch) {
    return {
      name: "calculate",
      args: { operation: "multiply", numbers: [Number(percentMatch[1]) / 100, Number(percentMatch[2])] }
    };
  }

  const expression = text.match(/(-?(?:\d+(?:\.\d*)?|\.\d+))\s*([+\-*/×]|(?<!\d)[xX](?!\d))\s*(-?(?:\d+(?:\.\d*)?|\.\d+))/);
  if (expression) {
    const operations = { "+": "add", "-": "subtract", "*": "multiply", "×": "multiply", x: "multiply", X: "multiply", "/": "divide" };
    return {
      name: "calculate",
      args: {
        operation: operations[expression[2]] || "subtract",
        numbers: [Number(expression[1]), Number(expression[3])]
      }
    };
  }

  if (/\b(calculate|compute|add|sum|subtract|minus|multiply|times|divide|divided)\b/.test(normalized) && numbers.length >= 2) {
    let operation = "add";
    if (/\b(subtract|minus|difference)\b/.test(normalized)) operation = "subtract";
    else if (/\b(multiply|times|product)\b/.test(normalized)) operation = "multiply";
    else if (/\b(divide|divided|quotient)\b/.test(normalized)) operation = "divide";
    return { name: "calculate", args: { operation, numbers } };
  }

  return null;
};
