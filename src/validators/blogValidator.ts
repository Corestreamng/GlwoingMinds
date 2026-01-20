import { body, param } from "express-validator";

const createBlogValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be between 3 and 200 characters"),
  
  body("category")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Category must be a string")
    .trim(),
  
  body("author")
    .notEmpty()
    .withMessage("Author is required")
    .isString()
    .withMessage("Author must be a string")
    .trim(),
  
  body("excerpt")
    .notEmpty()
    .withMessage("Excerpt is required")
    .isString()
    .withMessage("Excerpt must be a string")
    .trim()
    .isLength({ min: 10, max: 300 })
    .withMessage("Excerpt must be between 10 and 300 characters"),
  
  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isString()
    .withMessage("Content must be a string")
    .trim()
    .isLength({ min: 50 })
    .withMessage("Content must be at least 50 characters"),
  
  body("img_url")
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Must be a valid URL"),
  
  body("slug")
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

const updateBlogValidator = [
  body("title").optional().isString().trim().isLength({ min: 3, max: 200 }),
  body("category").optional().isString().trim(),
  body("author").optional().isString().trim(),
  body("excerpt").optional().isString().trim().isLength({ min: 10, max: 300 }),
  body("content").optional().isString().trim().isLength({ min: 50 }),
  body("img_url").optional().isURL(),
  body("slug").optional().isString().trim().isSlug().isLength({ min: 3, max: 200 }),
];

const deleteBlogValidator =
    param('id').isString().trim()

export { createBlogValidator, updateBlogValidator, deleteBlogValidator };