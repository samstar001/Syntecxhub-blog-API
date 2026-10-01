// routes/postRoutes.js
import express from "express";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost); // protected — only logged-in users can create
router.get("/", getPosts); // public — no login required to read posts
router.get("/:id", getPostById); // public
router.put("/:id", protect, updatePost); // users can only update their post
router.delete("/:id", protect, deletePost); // users can only delete their post

export default router;