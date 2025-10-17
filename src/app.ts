import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application, Request, Response } from "express";
import AuthRouter from "./routers/auth.router";

const PORT = process.env.PORT;

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.routers();
  }

  private configure = () => {
    this.app.use(cors());
    this.app.use(express.json());
  };

  private routers = () => {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("<h1>CLASSBASE API</h1>");
    });

    // define route
    const authRouter = new AuthRouter();
    this.app.use("/auth", authRouter.getRouter());
  };

  public startAPI = () => {
    this.app.listen(PORT, () => {
      console.log(`API RUNNING http://localhost:${PORT}`);
    });
  };
}

export default App;
