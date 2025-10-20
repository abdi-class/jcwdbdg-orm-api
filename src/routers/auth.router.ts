import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { regisValidation } from "../middleware/validations/auth.validation";

class AuthRouter {
  private route: Router;
  private authController: AuthController;

  constructor() {
    this.route = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.route.post("/regis", regisValidation, this.authController.register);
  };

  public getRouter = (): Router => {
    return this.route;
  };
}

export default AuthRouter;
