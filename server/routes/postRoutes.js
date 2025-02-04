import express from "express";
import {
  createPost,
  getMyPosts,
  deletePost,
  getUsersPosts,
} from "../controllers/postController.js";
import AuthenticateJWT from "../middleware/authenticateJWT.js";
const router = express.Router();

router.post("/create-post", AuthenticateJWT, createPost);
router.get("/get-my-posts", AuthenticateJWT, getMyPosts);
router.delete("/delete-post/:postId", AuthenticateJWT, deletePost);
router.get("/get-users-posts", AuthenticateJWT, getUsersPosts);

export default router;
