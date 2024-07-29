import User from "../models/users.model.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/error.handler.js";

const signToken = userId => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: user
    });
}

export async function signup(req, res, next) {
    try {
        const { username, email, password } = req.body;
        const newUser = await User.create({
            username,
            email,
            password
        });
        createSendToken(newUser, 201, res);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
}

export async function signin(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler(400, 'Please provide email and password'));
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new ErrorHandler(401, 'Incorrect email or password'));
        }
        createSendToken(user, 200, res);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
}

export async function googleLogin(req, res, next) {}

export async function signout(req, res, next) {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({ status: 'success' });
}