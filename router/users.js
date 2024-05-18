import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";
import verifyToken, { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const userRoute = express.Router();

userRoute.post("/", verifyToken, verifyAdmin, createUser);

userRoute.get("/", verifyToken, verifyAdmin, getAllUsers);

userRoute.get("/:id", verifyToken, verifyUser, getUserById);

userRoute.put("/:id", verifyToken, verifyUser, updateUser);

userRoute.delete("/:id", verifyToken, verifyUser, deleteUser);

export default userRoute;
