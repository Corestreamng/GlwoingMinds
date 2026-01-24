"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.SignUp = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../lib/prisma");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SignUp = (0, express_async_handler_1.default)(async (req, res) => {
    const { fullName, email, password, role } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
    try {
        const newUser = await prisma_1.prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
                role: role,
            },
        });
        const { password: _, ...user } = newUser;
        res
            .status(201)
            .json({ message: "User created successfully", user, hasError: false });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occured",
            error: error.message,
            hasError: true,
        });
    }
});
exports.Login = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const user = await prisma_1.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: "7d" });
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({
            message: "Login successful",
            token,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong",
            error: error?.message,
        });
    }
});
