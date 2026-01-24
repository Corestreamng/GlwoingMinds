import expressAsyncHandler from "express-async-handler";
import { prisma } from "../../lib/prisma";
import { Blog } from "@prisma/client";
import fs from "fs";
import path from "path";

export const createBlog = expressAsyncHandler(async (req, res) => {
  const { title, category, content, slug, excerpt, author } = req.body;

  const mediaUrl = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    const blog = await prisma.blog.create({
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
  } catch (error:any) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export const deleteBlog = expressAsyncHandler(async (req, res) => {
  const blogId = req.params.id;

  try {
    // Check if blog exists
    const blog = await prisma.blog.findUnique({
      where: { id:blogId as string },
    });

    if (!blog) {
       res.status(404).json({
        message: "Blog not found",
        hasError: true,
      });
      return
    }

    // Delete image file if it exists
    if (blog.img_url) {
      const filePath = path.join(
        process.cwd(),
        blog.img_url
      );

      fs.unlink(filePath, (err) => {
        if (err) console.warn("File not found:", err.message);
      });
    }

    // Delete blog from DB
    await prisma.blog.delete({
      where: { id:blogId as string },
    });

    res.status(200).json({
      message: "Blog deleted successfully",
      hasError: false,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete blog",
      hasError: true,
    });
  }
});

export const editBlog = expressAsyncHandler(async (req, res) => {
  const  id  = req.params.id;
  const {
    title,
    category,
    content,
    slug,
    excerpt,
    author,
  } = req.body;

  try {
    // Find existing blog
    const existingBlog = await prisma.blog.findUnique({
      where: { id:id as string },
    });

    if (!existingBlog) {
       res.status(404).json({
        message: "Blog not found",
      });
      return
    }

    // Handle image replacement
    let imageUrl = existingBlog.img_url;

    if (req.file) {
      const newImagePath = `/uploads/${req.file.filename}`;

      // delete old image if it exists
      if (existingBlog.img_url) {
        const oldImagePath = path.join(
          process.cwd(),
          existingBlog.img_url
        );
        console.log("Old image path: ",oldImagePath)

        fs.unlink(oldImagePath, (err) => {
          if (err) console.warn("Old image not found");
        });
      }

      imageUrl = newImagePath;
    }

    // Update blog
    const blog = await prisma.blog.update({
      where: { id:id as string },
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update blog",
    });
  }
});

export const getBlog = expressAsyncHandler(async (req, res) => {
  const blogs: Blog[] = await prisma.blog.findMany();
  res.status(200).json(blogs);
});
