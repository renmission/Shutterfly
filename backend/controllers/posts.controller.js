import sharp from "sharp";
import crypto from "crypto";
import Post from "../models/posts.model.js";
import { errorHandler } from "../utils/errors.js";
import { uploadFile, deleteFile, getObjectSignedUrl } from "../utils/s3.js";

const generatedFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

export async function getPosts(req, res, next) {
    try {
        const posts = await Post.find();
        for (const post of posts) {
            post.imageUrl = await getObjectSignedUrl(post.imageUrl);
        }
        res.json(posts);
    } catch (error) {
        next(errorHandler(500, error.message));        
    }
};

export async function createPost(req, res, next) {
    const file = req.file;
    const { title, content } = req.body;
    const imageName = generatedFileName();

    const fileBuffer = await sharp(file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer();

    try {
        await uploadFile(fileBuffer, imageName, file.mimetype);
        const post = new Post({ title, content, imageUrl: imageName });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
};

export async function deletePost(req, res, next) {
    const { id } = req.params;
    try {
        const post = await Post.findById({ _id: id });
        if (!post) {
            return next(errorHandler(404, "Post not found"));
        }
        await deleteFile(post.imageUrl);
        await post.remove();
        res.json(post);
    } catch (error) {
        next(errorHandler(500, error.message));
    }
}