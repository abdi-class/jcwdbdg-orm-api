import { NextFunction, Request, Response, Router } from "express";
import AuthController from "../controllers/auth.controller";
import { body, validationResult } from "express-validator";

class AuthRouter {
  private route: Router;
  private authController: AuthController;

  constructor() {
    this.route = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.route.post(
      "/regis",
      body("email").notEmpty().isEmail().withMessage("Email required"),
      (req: Request, res: Response, next: NextFunction) => {
        try {
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
            // throw { code: 400, errors };
            throw errors.array()[0].msg;
          }
          next(); // ini baru jalan ketika errors.isEmpty bernilai false
        } catch (error) {
          next(error);
        }
      },
      this.authController.register
    );
  };

  public getRouter = (): Router => {
    return this.route;
  };
}

export default AuthRouter;
