import mongoose from "mongoose";
import User from "../models/Users";
import * as dotenv from "dotenv";
import { accessSync } from "fs";

dotenv.config();

const mongoURL = process.env.MONGO_URI;

if (!mongoURL) {
  console.error("Please define the MONGO_URI environment variable");
  process.exit(1);
}

const updateUsers = async (url: string): Promise<void> => {
  try {
    const conn = await mongoose.connect(url);

    const usersToUpdate = await User.find({}, { _id: 1 });
    const userIds = usersToUpdate.map((user) => user._id);

    const result = await User.updateMany(
      { _id: { $in: userIds } },
      { $set: { isDeleted: false, friends: [] } },
      { multi: true }
    );

    console.log(
      `${result.modifiedCount} documents updated with isDeleted & friends field.`
    );

    conn.disconnect();
  } catch (error) {
    console.error("Error updating documents:", error);
  }
};

updateUsers(mongoURL);
