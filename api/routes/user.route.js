import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  signout,
  getUser,
  getUsers,
  upGetUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/getUsers", verifyToken, getUsers);
router.get("/:userId", getUser);
router.get("/update/:userId", upGetUser);
// router.put("/makeAuthor/:userId", verifyToken, makeAuthor);

export default router;
