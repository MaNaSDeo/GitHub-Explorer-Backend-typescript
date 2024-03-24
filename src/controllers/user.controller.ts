import { Request, Response } from "express";
import axios from "axios";
import User from "../models/Users";

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

    const response = await axios.get(`${process.env.GIT_URL}/${username}`); //Fetch data from Github API
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
  res.json(username);
};

const searchUsers = async (req: Request, res: Response) => {
  const { username, location, ...otherParams } = req.query;
  if (username && location) {
    res.json({ username, location });
  }
  if (username) {
    res.json(username);
  }
  if (location) {
    res.json(location);
  }
  res.json({ method: "searchUsers" });
};

const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  res.json(username);
};

const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  //   const { location, blog, bio } = req.body;
  const body = req.body;
  res.json({ username, body });
};

const listUsers = async (req: Request, res: Response) => {
  const query = req.query;
  res.json(query);
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
