import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      tyepe: String,
      required: true,
      unique: true,
    },
    email: {
      tyepe: String,
      required: true,
      unique: true,
    },
    password: {
      tyepe: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
