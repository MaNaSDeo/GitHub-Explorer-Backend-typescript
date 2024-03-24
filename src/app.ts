import * as dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import connectDB from "./db/connect";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>GitHub Explorer</h1>");
});

const start = async (): Promise<void> => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
