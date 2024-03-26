import { Request, Response } from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import User from "../models/Users";
import { SortOrder } from "mongoose";

interface SearchQuery {
  username?: RegExp;
  location?: RegExp;
  [key: string]: RegExp | number | boolean | undefined;
}

dotenv.config();

const GIT_URI = process.env.GIT_URL;

const save = (req: Request, res: Response): void => {
  console.log("Inside save function in controller");
  res.send("Reached save function in controller");
};

const saveUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const existingUser = await User.findOne({
      username: new RegExp(`^${username}$`, "i"),
    }); // Check if the user already exists in the database

    if (existingUser) {
      return res
        .status(200)
        .json({ message: "User already exists", user: existingUser });
    }

    const response = await axios.get(`${GIT_URI}/${username}`); //Fetch data from Github API
    const userData = response.data;

    const newUser = new User({ ...userData, username: userData.login }); // Create a new user document

    await newUser.save(); // Save the user document to the database

    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: `Error fetching or saving user`, error });
  }
};

const findMutualFollowers = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      username: new RegExp(`^${username}$`, "i"),
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followingResponse = await axios.get(
      `${GIT_URI}/${username}/following`
    ); // Fetch the user's following lists from the GitHub API
    const followersResponse = await axios.get(
      `${GIT_URI}/${username}/followers`
    ); // Fetch the user's followers lists from the GitHub API

    const following = followingResponse.data.map(
      (followee: { login: string }) => followee.login
    );
    const followers = followersResponse.data.map(
      (follower: { login: string }) => follower.login
    );

    const mutualFollowers = followers.filter((follower: { login: string }) =>
      following.includes(follower)
    ); // Find mutual followers (users the given user follows who also follow them back)

    const updatedUser = await User.findOneAndUpdate(
      { username: new RegExp(`^${username}$`, "i") },
      {
        $set: { friends: mutualFollowers },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Mutual followers saved as friends",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to find mutual followers", error });
  }
};

const searchUsers = async (req: Request, res: Response) => {
  const { ...queries } = req.query;

  try {
    const searchQuery: SearchQuery = {};

    Object.keys(queries).forEach((param) => {
      if (!isNaN(Number(queries[param]))) {
        searchQuery[param] = Number(queries[param]);
      } else if (typeof queries[param] === "boolean") {
        searchQuery[param] = queries[param] === "true";
      } else {
        searchQuery[param] = new RegExp(queries[param] as string, "i");
      }
    });

    const users = await User.find({ isDeleted: false, ...searchQuery });

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found matching the search criteria" });
    }

    res.status(200).json({ message: "Users found!", users });
  } catch (error) {
    res.status(500).json({ message: "Error searching for users", error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const deletedUser = await User.findOneAndUpdate(
      {
        username: new RegExp(`^${username}$`, "i"),
      },
      { $set: { isDeleted: true } },
      { new: true }
    ); // Find the user and mark them as deleted (soft delete)

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Error searching for users", error });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { location, blog, bio } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: new RegExp(`^${username}$`, "i") },
      { $set: { location, blog, bio } },
      { new: true }
    ); // Find the user and update their details

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

const listUsers = async (req: Request, res: Response) => {
  try {
    const { sortBy } = req.query; // Get the field to sort by from query parameters
    let sortCriteria: { [key: string]: SortOrder | { $meta: any } } = {}; // Define empty object for sorting criteria

    // Check if sortBy parameter is provided and set sorting criteria accordingly
    if (typeof sortBy === "string") {
      // Example: sortBy=name or sortBy=followers
      sortCriteria[sortBy] = 1; // Sort in ascending order based on the specified field
    } else {
      // Default sorting criteria if sortBy parameter is not provided
      sortCriteria["username"] = 1; // Sort by username in ascending order
    }

    // Fetch users from the database and apply sorting
    const users = await User.find({ isDeleted: false }).sort(sortCriteria);

    res.json(users); // Send the sorted list of users as JSON response
  } catch (error) {
    console.error("Error listing users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  save,
  saveUser,
  findMutualFollowers,
  searchUsers,
  deleteUser,
  updateUser,
  listUsers,
};
