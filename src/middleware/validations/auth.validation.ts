import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const validationCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw { code: 400, errors: errors.array() };
    }
    next(); // ini baru jalan ketika errors.isEmpty bernilai false
  } catch (error) {
    next(error);
  }
};

export const regisValidation = [
  body("username").notEmpty().withMessage("Username required"),
  body("email").notEmpty().isEmail().withMessage("Email required"),
  body("password")
    .notEmpty()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage("Password required"),
  validationCheck,
];

export const loginValidation = [
  body("email").notEmpty().isEmail().withMessage("Email required"),
  body("password").notEmpty().withMessage("Password required"),
  validationCheck,
];
