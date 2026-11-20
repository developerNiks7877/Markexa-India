
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  const errorStatus = err.statusCode || err.status;

  const statusCode =
    Number.isInteger(errorStatus) &&
    errorStatus >= 400 &&
    errorStatus <= 599
      ? errorStatus
      : 500;

  const message =
    statusCode === 500 && process.env.NODE_ENV === "production"
      ? "Internal Server Error"
      : err.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
