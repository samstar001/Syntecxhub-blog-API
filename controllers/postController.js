// controllers/postController.js
import mongoose from "mongoose";
import Post from "../models/Post.js";

// Creates a new post, owned by the logged-in user
export const createPost = async (req, res) => {
  const { title, body, tags } = req.body;

  try {
    // Only pull what the client is allowed to set — author comes from the token, never the body
    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }

    const post = new Post({
      title,
      body,
      tags: tags || [],
      author: req.user.id, // set from the verified JWT, not from req.body
    });

    await post.save();

    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lists posts with pagination, filtering, and sorting — all combined in one query
export const getPosts = async (req, res) => {
  try {
    // --- Pagination: fall back to safe defaults on bad or missing input ---
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = Math.min(limit, 10); // hard cap, per your requirement
    if (page < 1) page = 1;

    const skip = (page - 1) * limit;

    // --- Filtering: build the query object piece by piece ---
    const filter = {};

    if (req.query.tag) {
      // supports one tag ("node") or many ("node,backend")
      const tags = req.query.tag.split(",").map((t) => t.trim());
      filter.tags = { $in: tags }; // matches a post if ANY of its tags is in this list
    }

    if (req.query.author) {
      filter.author = req.query.author;
    }

    if (req.query.from || req.query.to) {
      filter.createdAt = {};
      if (req.query.from) filter.createdAt.$gte = new Date(req.query.from);
      if (req.query.to) filter.createdAt.$lte = new Date(req.query.to);
    }

    // --- Sorting ---
    const sortOrder = req.query.sort === "oldest" ? 1 : -1; // default newest first
    const sortObj = { createdAt: sortOrder };

    // --- Run the query and the count together ---
    const [posts, total] = await Promise.all([
      Post.find(filter).sort(sortObj).skip(skip).limit(limit),
      Post.countDocuments(filter),
    ]);

    res.status(200).json({
      data: posts,
      pagination: { page, limit, total, returned: posts.length },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetches a single post by its MongoDB _id
export const getPostById = async (req, res, next) => {
  const { id } = req.params;

  // Check the ID is even shaped like a valid ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post id" });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (err) {
    next(err); // hands it to errorHandler.js
  }
};

// Updates a post — only the original author may do this
export const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post id" });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Ownership check: compare the post's author to the logged-in user
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }

    const { title, body, tags } = req.body;
    if (title !== undefined) post.title = title;
    if (body !== undefined) post.body = body;
    if (tags !== undefined) post.tags = tags;

    await post.save();

    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deletes a post — only the original author may do this
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post id" });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};