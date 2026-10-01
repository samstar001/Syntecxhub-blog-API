import jwt from "jsonwebtoken";

// Middleware to protect routes from unauthorized access
export const protect = (req, res, next) => {
  const authHeader = req.header("Authorization");
  // Extract the token after the "Bearer " prefix
  const token = authHeader && authHeader.split(" ")[1];

  // If no token is provided, deny access
  if (!token)
    return res.status(401).json({ message: "No token, access denied" });

  try {
    // Verify the token using our JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
