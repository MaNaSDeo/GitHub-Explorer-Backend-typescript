import { Request, Response } from "express";

export const save = (req: Request, res: Response): void => {
  console.log("Inside save function in controller");
  res.send("Reached save function in controller");
};
