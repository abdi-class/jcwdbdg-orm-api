import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Application, Request, Response } from "express";
import prisma from "./prisma";

const PORT = process.env.PORT;

// define app server
const app: Application = express();

// define app basic middleware
app.use(cors()); // allow other domain to access api
app.use(express.json()); // for receive req.body

// define app main router
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>ORM API</h1>");
});

// define other route
app.get("/todo", async (req: Request, res: Response) => {
  try {
    const todo = await prisma.todo.findMany();

    res.status(200).send(todo);
  } catch (error) {
    console.log(error);
  }
});

app.post("/todo/create", async (req: Request, res: Response) => {
  try {
    const createTodo = await prisma.todo.create({ data: req.body });

    res.status(200).send({
      message: "ADD TODO",
      result: createTodo,
    });
  } catch (error) {
    console.log(error);
  }
});

// run app server
app.listen(PORT, () => {
  console.log("API RUNNING", PORT);
});
