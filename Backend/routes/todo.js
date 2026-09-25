import express from "express";
import {
  getTodos,
  getTodo,
  deleteTodo,
  createTodo,
  updateTodo,
} from "../controllers/todo.js";
import verify from "./verify.js";
const router = express.Router();

// protected routes
router.get("/", verify, getTodos);
router.get("/:id", verify, getTodo);
router.delete("/:id", verify, deleteTodo);
router.post("/", verify, createTodo);
router.patch("/:id", verify, updateTodo);

export default router;
