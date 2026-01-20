import expressAsyncHandler from "express-async-handler";
import { prisma } from "../../lib/prisma";
import { Blog } from "@prisma/client";

export const createBlog = expressAsyncHandler(async (req, res) => {
  const { title, category, content, slug, img_url, excerpt, author }: Blog =
    req.body;
  try {
    const blog = await prisma.blog.create({
      data: { title, category, content, slug, img_url, excerpt, author },
    });
    res.status(201).json({ message: `${title} created successfully`, blog });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: `An error occurred`, error: error.message });
  }
});

export const deleteBlog = expressAsyncHandler(async (req, res) => {
  const blogId: string | string[] = req.params.id;
  try {
    await prisma.blog.delete({
      where: {
        id: blogId as string,
      },
    });
    res
      .status(200)
      .json({ message: "Blog deleted successfully", hasError: false });
  } catch (error: any) {
    res
      .status(200)
      .json({ message: "An error occurred", error: error.message });
  }
});

export const editBlog = expressAsyncHandler(async (req, res) => {
  const { id, title, category, content, slug, img_url, excerpt, author }: Blog =
    req.body;
  try {
    const blog = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        title,
        category,
        content,
        slug,
        img_url,
        excerpt,
        author,
      },
    });
    res.status(200).json({
      message: `Blog ${title} has been editted successfully`,
      blog,
    });
  } catch (error: any) {
    res.status(200).json({
      message: `Something went wrong`,
      error: error.message,
    });
  }
});

export const getBlog = expressAsyncHandler(async (req, res) => {
  const blogs: Blog[] = await prisma.blog.findMany();
  res.status(200).json(blogs);
});
