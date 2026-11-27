export const errorHandler = (error, req, res, next) => {
    console.error("Application Error:", error.message);

    if (res.headersSent) {
        return next(error);
    }

    const candidate = error.statusCode || error.status || 500;

    const statusCode =
        Number.isInteger(candidate) &&
        candidate >= 400 &&
        candidate < 600
            ? candidate
            : 500;

    res.status(statusCode).json({
        success: false,
        message:
            statusCode === 500
                ? "Something went wrong. Please try again later."
                : error.message
    });
};