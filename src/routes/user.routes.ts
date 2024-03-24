import express from "express";
import { save } from "../controllers/user.controller";

const router = express.Router();

router.get("/save-user", save);

export default router;
