import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a name"],
    // collation: { locale: 'en', strength: 2 }
  },
  id: {
    type: Number,
    required: true,
  },
  avatar_url: {
    type: String,
  },
  type: {
    type: String,
    default: "User",
  },
  name: {
    type: String,
  },
  company: {
    type: String,
    default: "",
  },
  blog: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  public_repos: {
    type: Number,
    default: 0,
  },
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
