import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { hashPassword } from "../utils/hashPassword";
import { compare } from "bcrypt";
import { createToken } from "../utils/createToken";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // code
    await prisma.accounts.create({
      data: {
        ...req.body,
        password: await hashPassword(req.body.password),
      },
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
      where: {
        email: req.body.email,
      },
    });

    if (!account) {
      throw { code: 404, message: "Account not found" };
    }

    // validate password
    const comparePassword = await compare(req.body.password, account?.password);
    if (!comparePassword) {
      throw { code: 401, message: "Wrong password" };
    }

    res.status(200).send({
      success: true,
      result: {
        email: account.email,
        username: account.username,
        token: createToken({ id: account.id }),
      },
    });
  } catch (error) {
    next(error);
  }
};
