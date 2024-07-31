import express from "express";
import path from 'path';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

const __dirname = path.resolve();

dotenv.config();

import postsRouter from "./routes/posts.route.js";
import authRouter from "./routes/auth.route.js";
import usersRouter from "./routes/users.route.js";
import ErrorHandler from "./utils/error.handler.js";

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Failed to connect to MongoDB", error);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.use(rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOWS,
    max: process.env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.ip,
    message: { error: 'Too many requests, try again later.' },
  }),);
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors({
    origin: `https://${process.env.HOST}:${process.env.PORT}`,
    credentials: true
}));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postsRouter);


app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Can't find ${req.originalUrl} on this server`, 404));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    console.log(error);
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
     });
});