// middleware/errorHandler.js

// Catches anything passed to next(err) from anywhere in the app
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // full detail in your terminal, for debugging

  // Mongoose "CastError" happens when an ID is malformed (e.g. in findById)
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid id format" });
  }

  // Mongoose validation errors (e.g. a required field was missing on .save())
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // MongoDB duplicate key error (e.g. unique email/username already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ message: `${field} already exists` });
  }

  // Fallback: anything we didn't anticipate
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Server error" });
};

// Catches requests to routes that don't exist at all
export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};