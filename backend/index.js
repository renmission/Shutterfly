import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import postsRouter from "./routes/posts.route.js";

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Failed to connect to MongoDB", error);
});

const app = express();
const PORT = 3000;


app.use("/api/posts", postsRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});