import express from "express";
import {
  save,
  saveUser,
  findMutualFollowers,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/save", save);

// GitHub User Data Storage
router.get("/save-user/:username", saveUser);

// Mutual Followers as Friends
router.get("/find-mutual-followers/:username", findMutualFollowers);

// Search Functionality
router.get("/search-users", searchUsers);

// Soft Delete User Records
router.delete("/delete-user/:username", deleteUser);

// Update User Details
router.patch("/update-user/:username", updateUser);

// List Users with Sorting
router.get("/list-users", listUsers);

export default router;
