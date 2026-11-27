const operationSymbols = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷"
};

const formatNumber = (value) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 10 }).format(value);

export const formatToolResult = (name, result, message) => {
  if (name === "calculate") {
    const percentageMatch = message.match(
      /([-+]?\d+(?:\.\d+)?)\s*%\s*of\s*([-+]?\d+(?:\.\d+)?)/i
    );

    if (percentageMatch) {
      return `${percentageMatch[1]}% of ${formatNumber(Number(percentageMatch[2]))} = ${formatNumber(result.result)}`;
    }

    const symbol = operationSymbols[result.operation];
    if (symbol && Array.isArray(result.numbers)) {
      return `${result.numbers.map(formatNumber).join(` ${symbol} `)} = ${formatNumber(result.result)}`;
    }
  }

  return `${name} result:\n${JSON.stringify(result, null, 2)}`;
};
