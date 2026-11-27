
export const calculate = ({ operation, numbers }) => {

    // 1. Check the operation
    const allowedOperations = ["add", "subtract", "multiply", "divide"];

    if (!allowedOperations.includes(operation)) {
        throw new Error("Invalid operation. Use add, subtract, multiply, or divide.");
    }

    // 2. Check the numbers
    if (!Array.isArray(numbers) || numbers.length < 2) {
        throw new Error("Please provide at least two numbers.");
    }

    if (!numbers.every(
        number => typeof number === "number" && Number.isFinite(number)
    )) {
        throw new Error("All inputs must be valid numbers.");
    }

    // 3. Perform the calculation
    let result = numbers[0];

    for (let i = 1; i < numbers.length; i++) {

        const currentNumber = numbers[i];

        switch (operation) {
            case "add":
                result += currentNumber;
                break;

            case "subtract":
                result -= currentNumber;
                break;

            case "multiply":
                result *= currentNumber;
                break;

            case "divide":
                if (currentNumber === 0) {
                    throw new Error("Cannot divide by zero.");
                }
                result /= currentNumber;
                break;
        }
    }

    // 4. Return the answer
    return {
        operation,
        numbers,
        result
    };
};
