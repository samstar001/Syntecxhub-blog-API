// Import Mongoose library to define schemas and models.
import mongoose from "mongoose";

// Define the structure and rules for post documents.
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },

    // Reference ID linking the post to its User author.
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Array of tags associated with the post.
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    // Automatically add and update createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Add performance indexes for tags, author, and creation date.
PostSchema.index({ tags: 1 });
PostSchema.index({ author: 1 });
PostSchema.index({ createdAt: -1 });

// Export the compiled Post model based on the schema
export default mongoose.model("Post", PostSchema);
