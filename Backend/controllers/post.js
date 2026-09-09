import Posts from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
};

export const getPost = async (req, res) => {
  try {
    const Post = await Posts.findById(req.params.id);
    res.json(Post);
  } catch (err) {
    res.json({ message: err });
  }
};

export const createPost = async (req, res) => {
  const post = new Posts({
    title: req.body.title,
    description: req.body.description,
    author: req.user._id
  });
  try {
    console.log("we just got a request", post);
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const deletePost = async (req, res) => {
  //console.log(req.params);
  try {
    const removedPost = await Posts.remove({ _id: req.params.id });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Posts.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );

    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
};
