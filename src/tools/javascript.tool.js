
// 1. Get current date and time
export const getCurrentDateTime = () => {
  return {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    timestamp: new Date().toISOString()
  };
};

// 2. Calculate age from birth year
export const calculateAge = ({ birthYear }) => {
  const currentYear = new Date().getFullYear();

  if (
    typeof birthYear !== "number" ||
    !Number.isInteger(birthYear) ||
    birthYear < 1900 ||
    birthYear > currentYear
  ) {
    throw new Error("Please provide a valid birth year.");
  }

  return {
    birthYear,
    currentYear,
    age: currentYear - birthYear
  };
};

// 3. Convert Celsius to Fahrenheit
export const convertCelsiusToFahrenheit = ({ celsius }) => {
  if (typeof celsius !== "number" || !Number.isFinite(celsius)) {
    throw new Error("Please provide a valid temperature.");
  }

  return {
    celsius,
    fahrenheit: (celsius * 9 / 5) + 32
  };
};

// 4. Convert Fahrenheit to Celsius
export const convertFahrenheitToCelsius = ({ fahrenheit }) => {
  if (typeof fahrenheit !== "number" || !Number.isFinite(fahrenheit)) {
    throw new Error("Please provide a valid temperature.");
  }

  return {
    fahrenheit,
    celsius: (fahrenheit - 32) * 5 / 9
  };
};

// 5. Generate a random number
export const generateRandomNumber = ({ min, max }) => {
  if (
    typeof min !== "number" ||
    typeof max !== "number" ||
    !Number.isInteger(min) ||
    !Number.isInteger(max) ||
    min > max
  ) {
    throw new Error("Please provide valid minimum and maximum integers.");
  }

  return {
    min,
    max,
    randomNumber: Math.floor(Math.random() * (max - min + 1)) + min
  };
};

// 6. Process an array of numbers
export const processNumbers = ({ numbers }) => {
  if (
    !Array.isArray(numbers) ||
    numbers.length === 0 ||
    !numbers.every(number => typeof number === "number" && Number.isFinite(number))
  ) {
    throw new Error("Please provide a non-empty array of valid numbers.");
  }

  const total = numbers.reduce((sum, number) => sum + number, 0);

  return {
    numbers,
    count: numbers.length,
    total,
    average: total / numbers.length,
    maximum: Math.max(...numbers),
    minimum: Math.min(...numbers)
  };
};
