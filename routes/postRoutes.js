// routes/postRoutes.js
import express from "express";
import { createPost, getPosts, getPostById } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost); // protected — only logged-in users can create
router.get("/", getPosts); // public — no login required to read posts
router.get("/:id", getPostById); // public

export default router;