import User from "../models/user.model.js";
// import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All field are required"));
  }
  const newUser = new User({
    username,
    email,
    password,
  });

  // console.log(req.body);
  // res.json(req);
  try {
    await newUser.save();
    res.json("Sign successful");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || !password === "") {
    next(errorHandler(400, "All fields are rquired"));
  }
  try {
    const validUser = await User.findOne(email);
    if (!validUser) {
      return next(errorHandler(404, "user not found"));
    }
    const validPassword = validUser.password;
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SEC);

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("acees_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
