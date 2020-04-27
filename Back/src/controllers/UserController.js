import { check, validationResult } from "express-validator";
import { UserModel } from "../models";
import socket from "socket.io";
import { createJWToken, generatePasswordHash } from "../utils";
import bcrypt from "bcrypt";

class UserController {
    io;
    constructor(io) {
        this.io = io;
    }
    show = (req, res) => {
        const id = req.params.id;
        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            res.json(user);
        });
    };

    getMe = (req, res) => {
        const id = req.user._id;
        UserModel.findById(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            res.json(user);
        });
    };

    create = (req, res) => {
        const postData = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
        };

        const user = new UserModel(postData);
        user.save()
            .then((obj) => {
                res.json(obj);
            })
            .catch((reason) => {
                res.json(reason);
            });
    };

    delete = (req, res) => {
        const id = req.params.id;
        UserModel.findOneAndRemove({ _id: id })
            .then((user) => {
                if (user) {
                    res.json({
                        message: `User ${user.fullname} deleted`,
                    });
                }
            })
            .catch(() => {
                res.json({
                    message: `User not found`,
                });
            });
    };

    login = (req, res) => {
        const postData = {
            email: req.body.email,
            password: req.body.password,
        };

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                status: "error_422",
                message: "Введите правельные данные",
            });
            return;
            // return res.status(422).json({ errors: errors.array() });
        }

        UserModel.findOne({ email: postData.email }, (err, user) => {
            if (err || !user) {
                // return res.status(404).json({
                //     message: "User not found",
                // });
                res.json({
                    status: "error_404",
                    message: "Пароль не верен",
                });
                return;
            }

            if (bcrypt.compareSync(postData.password, user.password)) {
                const token = createJWToken(user);
                res.json({
                    status: "success",
                    token,
                });
            } else {
                res.json({
                    status: "error_408",
                    message: "Неверный password",
                });
            }
        });
    };
}

export default UserController;
