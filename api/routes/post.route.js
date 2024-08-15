import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletepost,
  getposts,
  updatePost,
  getPostsUser,
} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.get("/getposts/:userId", getPostsUser);
router.delete(`/deletepost/:postId/:userId`, verifyToken, deletepost);
router.delete(`/deletepost/:postId`, verifyToken, deletepost);
router.put("/updatepost/:postId/:userId", verifyToken, updatePost);
export default router;
