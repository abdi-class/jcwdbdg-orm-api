import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { transport } from "../config/nodemailer";
import { regisTemplate } from "../templates/regis.template";

class AuthController {
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // code
      const newwAccount = await prisma.accounts.create({
        data: req.body,
      });

      // send email for send information to user
      await transport.sendMail({
        from: process.env.MAIL_SENDER,
        to: newwAccount.email,
        subject: "Registration info",
        html: regisTemplate(newwAccount.username),
      });

      res.status(200).send({
        message: "Registration Success",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
