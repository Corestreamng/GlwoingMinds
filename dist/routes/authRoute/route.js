"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authValidator_1 = require("../../validators/authValidator");
const authController_1 = require("../../controllers/auth/authController");
const router = express_1.default.Router();
router.post("/signup", authValidator_1.signupValidator, authController_1.SignUp);
router.post("/login", authValidator_1.loginValidator, authController_1.Login);
exports.default = router;
