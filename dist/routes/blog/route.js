"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../../controllers/blog/blogController");
const blogValidator_1 = require("../../validators/blogValidator");
const upload_1 = require("../../middleware/upload");
const router = express_1.default.Router();
router.post("/blog", upload_1.upload.single("media"), blogValidator_1.createBlogValidator, blogController_1.createBlog);
router.put("/blog/:id", blogValidator_1.updateBlogValidator, upload_1.upload.single("media"), blogController_1.editBlog);
router.delete("/blog/:id", blogValidator_1.deleteBlogValidator, blogController_1.deleteBlog);
router.get("/blog", blogController_1.getBlog);
exports.default = router;
