import Post from "../models/postSchema.js";
import User from "../models/userSchema.js";

export const createPost = async (req, res) => {
  const postInfo = req.body;
  try {
    const newPost = new Post({
      title: postInfo.title,
      content: postInfo.content,
      thumbnail: postInfo.thumbnail,
      author: postInfo.userId,
    });
    await newPost.save();
    res.status(200).json({ message: "Post Created Successfully!" });
  } catch (err) {
    console.log("server error" + err);
    return res
      .status(500)
      .json({ message: "An error occurred while Creating Post." });
  }
};
export const getMyPosts = async (req, res) => {
  try {
    const userId = req.query.userId;
    const posts = await Post.find({ author: userId });
    res.status(200).json(posts);
  } catch (err) {
    console.log("server error" + err);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching Posts." });
  }
};
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post Deleted Successfully!" });
  } catch (err) {
    console.log("server error" + err);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting Post." });
  }
};
export const getUsersPosts = async (req, res) => {
  try {
    const posts = await User.find({ role: "User" });
    res.status(200).json(posts);
  } catch (err) {
    console.log("server error" + err);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching Users." });
  }
};
