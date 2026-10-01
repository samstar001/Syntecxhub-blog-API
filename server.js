import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js"
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use(notFound);     // catches unmatched routes
app.use(errorHandler); // catches everything passed via next(err)

// Start the server and listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port http://localhost:${PORT}`));