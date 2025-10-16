import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application, Request, Response } from "express";
import authRouter from "./routers/auth.router";

const PORT = process.env.PORT;

// define app server
const app: Application = express();

// define app basic middleware
app.use(cors()); // allow other domain to access api
app.use(express.json()); // for receive req.body

// define app main router
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>Blog API</h1>");
});

app.use("/auth", authRouter);

// run app server
app.listen(PORT, () => {
  console.log("API RUNNING", PORT);
});
