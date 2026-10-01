// Import mongoose to create the schema
import mongoose from "mongoose";

// Define the structure of the User document in the database
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", UserSchema);
