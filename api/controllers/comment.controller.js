import { errorHandler } from "../utils/error.js";
import Comment from "../models/comment.model.js";
// import mongoose from "mongoose";

export const createComment = async (req, res, next) => {
  try {
    const { content, fullname, postId } = req.body;

    const newComment = new Comment({
      content,
      fullname,
      postId,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to view comments"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;

    const comments = await Comment.find()
      .sort({
        createdAt: sortDirection,
      })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      comments,
      totalComments,
      lastMonthComments,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  if (!req.user.isAdmin) {
    next(errorHandler(403, "You are not allowed to delete this Comment"));
  }
  try {
    const commentIdToDelete = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    res.status(200).json(`${commentIdToDelete} is deleted`);
  } catch (error) {
    next(error);
  }
};
