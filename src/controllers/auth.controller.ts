import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // code
    await prisma.accounts.create({
      data: req.body,
    });

    res.status(200).send({
      message: "Registration Success",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // code
    const account = await prisma.accounts.findUnique({
      where: req.body,
      omit: {
        password: true,
      },
    });

    res.status(200).send({
      success: true,
      result: account,
    });
  } catch (error) {
    next(error);
  }
};
