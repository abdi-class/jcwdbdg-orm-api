import { NextFunction, Request, Response } from "express";

class AuthController {
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //
    } catch (error) {
      console.log(error);
      res.status(200).send(error);
    }
  };
}

export default AuthController;
