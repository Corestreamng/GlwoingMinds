import express from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getBlog,
} from "../../controllers/blog/blogController";
import {
  createBlogValidator,
  deleteBlogValidator,
  updateBlogValidator,
} from "../../validators/blogValidator";
import { upload } from "../../middleware/upload";

const router = express.Router();

router.post("/blog", upload.single("media"), createBlogValidator, createBlog);
router.put("/blog/:id", updateBlogValidator, upload.single("media"), editBlog);
router.delete("/blog/:id", deleteBlogValidator, deleteBlog);
router.get("/blog", getBlog);

export default router;
