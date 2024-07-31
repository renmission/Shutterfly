import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, myPosts } from "../controllers/posts.controller.js";

const router = Router();

import multer from "multer";
import { protect } from "../controllers/auth.controller.js";
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", protect, getPosts);
router.get("/:id", protect, getPost);
router.get("/my-posts", protect, myPosts);
router.post("/", protect, upload.single('file'), createPost);
router.delete('/:id', protect, deletePost);

export default router;