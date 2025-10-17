import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const create = await prisma.blogs.create({
      data: {
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        content: req.body.content,
        accountsId: parseInt(res.locals.decript.id),
      },
    });

    res.status(200).send({
      message: "Create blog success",
      result: create,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogs = await prisma.blogs.findMany();

    res.status(200).send(blogs);
  } catch (error) {
    next(error);
  }
};

export const getBlogDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const blogDetail = await prisma.blogs.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).send(blogDetail);
  } catch (error) {
    next(error);
  }
};
