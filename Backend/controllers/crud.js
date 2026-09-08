import User from "../models/User.js";
import { registerValidation, loginValidation } from "../models/Validate.js";
import verify from "../routes/verify.js";
import bcrypt from "bcryptjs";
import jasonWebToken from "jsonwebtoken";

export const getUsers = async (req, res) => {
  //res.send("son of *****");
  try {
    const posts = await User.find();
    res.send(posts);
  } catch (err) {
    res.send(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const User = await User.findById(req.params.id);
    res.json(User);
  } catch (err) {
    res.json({ message: err });
  }
};

export const createUser = async (req, res) => {
  // check input error
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  // check if user already exits
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("User with that email already exists!");
  }
  // hash pwd
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  // create new user object
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });
  try {
    const savedUser = await newUser.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    console.log("error: ", err);
    res.status(400);
    res.send(err);
  }
};
// login
export const loginUser = async (req, res) => {
  // check input error
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  // check if user already exits
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("User with that email doesn't exists!");
  }
  // compare pass
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid Password!");
  }

  // create a jasonWebToken token
  const tok = jasonWebToken.sign(
    { _id: user._id },
    process.env["TOKEN_SECRET"], {expiresIn: '1h'}
  );
  res.cookie('token', tok, {
    httpOnly: true,     // Prevents JS access (XSS protection)
    secure: false,       // Only send over HTTPS (use false for localhost)
    sameSite: 'LAX', // CSRF protection
    maxAge: 3600000     // 1 hour in milliseconds
  });
  try {
    await tok;
    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    res.send(err);
  }
};

// logout
export const logoutUser = async (req, res) => {
  try {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,      // Must match your original cookie settings
    sameSite: 'LAX', // Must match your original cookie settings
  });
  
  return res.status(200).json({ message: "Logged out successfully" });

  } catch (err) {
    res.send(err);
  }
};

export const deleteUser = async (req, res) => {
  //console.log(req.params);
  //61aaf510ba8d759fb3c598a0
  try {
    const removedUser = await User.remove({ _id: req.params.id });

    res.send(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } },
    );

    res.send(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
};

export const getPosts = (req, res) => {
  //res.json({posts:{title: "hello",
  //    description: "How are you?"}});
  res.send(req.user);
  User.findOne({_id: req.user});
};
