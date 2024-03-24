import mongoose from "mongoose";

const connectDB = (url: string): Promise<typeof mongoose> => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to the Database...");
      return mongoose;
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

export default connectDB;
