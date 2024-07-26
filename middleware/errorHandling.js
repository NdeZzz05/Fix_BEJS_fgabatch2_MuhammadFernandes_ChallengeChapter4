const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    error: { message },
  });
};

module.exports = errorHandler;
