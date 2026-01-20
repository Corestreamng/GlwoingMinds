import { body } from "express-validator";

export const signupValidator = [
  body("fullName").notEmpty().isString().withMessage("First name is required"),
  body("email")
    .isEmail()
    .notEmpty()
    .normalizeEmail()
    .withMessage("Email is required"),
  body("password")
    .isString()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be more than 6 characters long"),
  body("role").isIn(["ADMIN", "SUPERADMIN", "EDITOR"]).withMessage("Invalid role"),
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid Email"),
  body("password")
    .notEmpty()
    .isString()
    .withMessage("Username or password is incorrect"),
  body("fullName").notEmpty().isString().withMessage("Full name is required"),
];
