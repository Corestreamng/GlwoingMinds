import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
} from "../../controllers/blog/blogController";
import {
  createBlogValidator,
  deleteBlogValidator,
  updateBlogValidator,
} from "../../validators/blogValidator";

const router = express.Router();

router.post("/blog", createBlogValidator, createBlog);
router.put("/blog", updateBlogValidator, editBlog);
router.delete("/blog", deleteBlogValidator, deleteBlog);
router.get("/blog", deleteBlog);

export default router;
