import { Router } from "express";
import { createPost, deletePost, getPosts } from "../controllers/posts.controller.js";

const router = Router();

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getPosts);
router.post("/", upload.single('file'), createPost);
router.delete('/:id', deletePost);

export default router;