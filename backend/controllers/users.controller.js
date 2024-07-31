import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/users.model.js";
import ErrorHandler from "../utils/error.handler.js";
import { createSendToken } from "./auth.controller.js";

export async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
}

export async function updateUser(req, res, next) {
    if(req.user.id !== req.params.id) {
        return next(new ErrorHandler(403, 'You are not authorized to perform this action'));
    }
    try {
        if(req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 12);
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        createSendToken(user, 200, res);
    } catch (error) {
        next(new ErrorHandler(500, error.message));
    }
}