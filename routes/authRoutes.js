import express from "express";
import { register, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

// Initialize the Express router
const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

// Define a GET route that is PROTECTED (requires valid JWT)
router.get("/me", protect, (req, res) => {
  res.json({ userId: req.user.id, status: "Authentication Successful" });
});

// Export the router to be used in server.js
export default router;
