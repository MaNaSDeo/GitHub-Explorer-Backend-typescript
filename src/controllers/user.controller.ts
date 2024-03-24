import { Request, Response } from "express";

const save = (req: Request, res: Response): void => {
  console.log("Inside save function in controller");
  res.send("Reached save function in controller");
};

const saveUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  res.json(username);
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
