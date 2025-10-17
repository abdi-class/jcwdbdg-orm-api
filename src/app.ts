import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application, Request, Response } from "express";

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
  };

  public startAPI = () => {
    this.app.listen(PORT, () => {
      console.log(`API RUNNING http://localhost:${PORT}`);
    });
  };
}

export default App;
