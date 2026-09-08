import express from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  createUser,
  updateUser,
  loginUser,
  logoutUser
  
} from "../controllers/crud.js";
import verify from "./verify.js";

const router = express.Router();
router.get("/verify", verify, (req, res) => {
  // If the middleware succeeds, send back true
  res.status(200).json({ 
    isAuthenticated: true,
  })});
router.get("/", getUsers);
router.get("/:id", getUser); // /:variable <- stands for req.params.variable not req.body.variable
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register", createUser);
router.patch("/:id", updateUser);

export default router;
