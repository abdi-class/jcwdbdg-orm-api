import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";

class AuthController {
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
        console.log(error);
        res.status(500).send(error);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
}

export default AuthController;
