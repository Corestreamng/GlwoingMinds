"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlog = exports.editBlog = exports.deleteBlog = exports.createBlog = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = require("../../lib/prisma");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.createBlog = (0, express_async_handler_1.default)(async (req, res) => {
    const { title, category, content, slug, excerpt, author } = req.body;
    const mediaUrl = req.file ? `/uploads/${req.file.filename}` : "";
    try {
        const blog = await prisma_1.prisma.blog.create({
            data: {
                title,
                category,
                content,
                slug,
                excerpt,
                author,
                img_url: mediaUrl,
            },
        });
        res.status(201).json({
            message: `${mediaUrl} created successfully`,
            blog,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
exports.deleteBlog = (0, express_async_handler_1.default)(async (req, res) => {
    const blogId = req.params.id;
    try {
        // Check if blog exists
        const blog = await prisma_1.prisma.blog.findUnique({
            where: { id: blogId },
        });
        if (!blog) {
            res.status(404).json({
                message: "Blog not found",
                hasError: true,
            });
            return;
        }
        // Delete image file if it exists
        if (blog.img_url) {
            const filePath = path_1.default.join(process.cwd(), blog.img_url);
            fs_1.default.unlink(filePath, (err) => {
                if (err)
                    console.warn("File not found:", err.message);
            });
        }
        // Delete blog from DB
        await prisma_1.prisma.blog.delete({
            where: { id: blogId },
        });
        res.status(200).json({
            message: "Blog deleted successfully",
            hasError: false,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete blog",
            hasError: true,
        });
    }
});
exports.editBlog = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.params.id;
    const { title, category, content, slug, excerpt, author, } = req.body;
    try {
        // Find existing blog
        const existingBlog = await prisma_1.prisma.blog.findUnique({
            where: { id: id },
        });
        if (!existingBlog) {
            res.status(404).json({
                message: "Blog not found",
            });
            return;
        }
        // Handle image replacement
        let imageUrl = existingBlog.img_url;
        if (req.file) {
            const newImagePath = `/uploads/${req.file.filename}`;
            // delete old image if it exists
            if (existingBlog.img_url) {
                const oldImagePath = path_1.default.join(process.cwd(), existingBlog.img_url);
                console.log("Old image path: ", oldImagePath);
                fs_1.default.unlink(oldImagePath, (err) => {
                    if (err)
                        console.warn("Old image not found");
                });
            }
            imageUrl = newImagePath;
        }
        // Update blog
        const blog = await prisma_1.prisma.blog.update({
            where: { id: id },
            data: {
                ...(title && { title }),
                ...(category && { category }),
                ...(content && { content }),
                ...(excerpt && { excerpt }),
                ...(slug && { slug }),
                ...(author && { author }),
                img_url: imageUrl,
            },
        });
        res.status(200).json({
            message: "Blog updated successfully",
            blog,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update blog",
        });
    }
});
exports.getBlog = (0, express_async_handler_1.default)(async (req, res) => {
    const blogs = await prisma_1.prisma.blog.findMany();
    res.status(200).json(blogs);
});
