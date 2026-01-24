"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogValidator = exports.updateBlogValidator = exports.createBlogValidator = void 0;
const express_validator_1 = require("express-validator");
const createBlogValidator = [
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title must be a string")
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage("Title must be between 3 and 200 characters"),
    (0, express_validator_1.body)("category")
        .optional({ values: "falsy" })
        .isString()
        .withMessage("Category must be a string")
        .trim(),
    (0, express_validator_1.body)("author")
        .notEmpty()
        .withMessage("Author is required")
        .isString()
        .withMessage("Author must be a string")
        .trim(),
    (0, express_validator_1.body)("excerpt")
        .notEmpty()
        .withMessage("Excerpt is required")
        .isString()
        .withMessage("Excerpt must be a string")
        .trim()
        .isLength({ min: 10, max: 300 })
        .withMessage("Excerpt must be between 10 and 300 characters"),
    (0, express_validator_1.body)("content")
        .notEmpty()
        .withMessage("Content is required")
        .isString()
        .withMessage("Content must be a string")
        .trim()
        .isLength({ min: 50 })
        .withMessage("Content must be at least 50 characters"),
    (0, express_validator_1.body)("img_url")
        .notEmpty()
        .withMessage("Image URL is required")
        .isURL()
        .withMessage("Must be a valid URL"),
    (0, express_validator_1.body)("slug")
        .notEmpty()
        .withMessage("Slug is required")
        .isString()
        .withMessage("Slug must be a string")
        .trim()
        .isSlug()
        .withMessage("Must be a valid slug (lowercase, hyphens only)")
        .isLength({ min: 3, max: 200 })
        .withMessage("Slug must be between 3 and 200 characters"),
];
exports.createBlogValidator = createBlogValidator;
const updateBlogValidator = [
    (0, express_validator_1.body)("title").optional().isString().trim().isLength({ min: 3, max: 200 }),
    (0, express_validator_1.body)("category").optional().isString().trim(),
    (0, express_validator_1.body)("author").optional().isString().trim(),
    (0, express_validator_1.body)("excerpt").optional().isString().trim().isLength({ min: 10, max: 300 }),
    (0, express_validator_1.body)("content").optional().isString().trim().isLength({ min: 50 }),
    (0, express_validator_1.body)("img_url").optional().isURL(),
    (0, express_validator_1.body)("slug").optional().isString().trim().isSlug().isLength({ min: 3, max: 200 }),
];
exports.updateBlogValidator = updateBlogValidator;
const deleteBlogValidator = (0, express_validator_1.param)('id').isString().trim();
exports.deleteBlogValidator = deleteBlogValidator;
