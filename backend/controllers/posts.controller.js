import sharp from "sharp";
import crypto from "crypto";
import Post from "../models/posts.model.js";
import ErrorHandler from "../utils/error.handler.js";
import { uploadFile, deleteFile, getObjectSignedUrl } from "../utils/s3.js";
import User from "../models/users.model.js";

const generatedFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

async function fetchAndPopulatePosts(query) {
    const posts = await Post.find(query).populate('userId', 'firstName lastName email profilePicture');
    for (const post of posts) {
        post.imageUrl = await getObjectSignedUrl(post.imageUrl);
    }
    return posts;
}

export async function getPosts(req, res, next) {
    try {
        const posts = await fetchAndPopulatePosts({});
        res.json(posts);
    } catch (error) {
        next(new ErrorHandler(500, error.message));        
    }
};

export async function myPosts(req, res, next) {
    try {
        const posts = await fetchAndPopulatePosts({ userId: req.user.id });
        res.json(posts);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
}

export async function getPost(req, res, next) {
    const { id } = req.params;
    try {
        const post = await Post.findById({ _id: id }).populate('userId', 'firstName lastName email profilePicture');
        if (!post) {
            return next(new ErrorHandler(404, "Post not found"));
        }
        post.imageUrl = await getObjectSignedUrl(post.imageUrl);
        res.json(post);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
};

export async function createPost(req, res, next) {
    const file = req.file;
    const { title, content } = req.body;
    const imageName = generatedFileName();

    const fileBuffer = await sharp(file.buffer).resize({ height: 1920, width: 1080, fit: "contain" }).toBuffer();

    try {
        await uploadFile(fileBuffer, imageName, file.mimetype);
        const post = new Post({ title, content, imageUrl: imageName, userId: req.user.id });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
};

export async function deletePost(req, res, next) {
    if (!req.user.id) {
        return next(new ErrorHandler(403, "You are not authorized to perform this action"));
    }
    const { id } = req.params;
    try {
        const post = await Post.findById({ _id: id });

        if (req.user.id.toString() !== post.userId.toString()) {
            return next(new ErrorHandler(403, "You are not authorized to perform this action"));
        }

        if (!post) {
            return next(new ErrorHandler(404, "Post not found"));
        }
        await deleteFile(post.imageUrl);
        await Post.findByIdAndDelete({ _id: id });
        res.json(post);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
}