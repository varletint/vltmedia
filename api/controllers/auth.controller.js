import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    res.status(400).json({ message: " All field are required!" });
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
  } catch (err) {
    res.send("error");
  }
};
