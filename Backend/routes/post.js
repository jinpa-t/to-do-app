import express from "express";
import {
  getPosts,
  getPost,
  deletePost,
  createPost,
  updatePost,
} from "../controllers/post.js";
import verify from "./verify.js";
const router = express.Router();

/*
{
    "firstName":"John",
    "lastName":"Doe",
    "age": 24
    }
    
    {
        "firstName":"Jane",
        "lastName":"Doe",
        "age": 23
        }
        
*/
// protected route
router.get("/", verify, getPosts);

router.get("/:id", verify, getPost);
router.delete("/:id", verify, deletePost);
router.post("/", verify, createPost);
router.patch("/:id", verify, updatePost);

export default router;
