import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    postId: {
      type: String,
      require: true,
    },
    fullname: {
      type: String,
      require: true,
      default: "",
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
