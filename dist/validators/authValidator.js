"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.signupValidator = void 0;
const express_validator_1 = require("express-validator");
exports.signupValidator = [
    (0, express_validator_1.body)("fullName").notEmpty().isString().withMessage("First name is required"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .notEmpty()
        .normalizeEmail()
        .withMessage("Email is required"),
    (0, express_validator_1.body)("password")
        .isString()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password must be more than 6 characters long"),
    (0, express_validator_1.body)("role").isIn(["ADMIN", "SUPERADMIN", "EDITOR"]).withMessage("Invalid role"),
];
exports.loginValidator = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage("Invalid Email"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .isString()
        .withMessage("Username or password is incorrect"),
    (0, express_validator_1.body)("fullName").notEmpty().isString().withMessage("Full name is required"),
];
