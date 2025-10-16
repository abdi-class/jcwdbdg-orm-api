import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import authRouter from "./routers/auth.router";
import blogsRouter from "./routers/blogs.router";

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
app.use("/blogs", blogsRouter);

// error middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(error.code || 500).send(error);
});

// run app server
app.listen(PORT, () => {
  console.log("API RUNNING", PORT);
});
