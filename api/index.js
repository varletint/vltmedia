import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

// const dotenv = require("dotenv");

const app = express();

app.use(express.json());

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb conneted");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("running at 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
