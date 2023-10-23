import express from "express";
import {
  getAllUsers,
  loginUser,
  logout,
  registerUser,
} from "../controllers/user";
import { validator } from "../middlewares/validator";

const authRouter = express.Router();

authRouter.post("/signup", registerUser);

authRouter.post("/login", loginUser);

authRouter.get("/getAllUsers", validator, getAllUsers);

authRouter.post("/logout", logout);

export default authRouter;
