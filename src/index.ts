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
// user router controller
app.post("/auth/regis", async (req: Request, res: Response) => {
  try {
    const regis = await prisma.user.create({
      data: req.body,
    });

    res.status(200).send({
      message: "Register account success",
      result: regis,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

// todo router controller
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

app.patch("/todo/update/:id", async (req: Request, res: Response) => {
  try {
    const updateTodo = await prisma.todo.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    res.status(200).send({
      message: "Update Todo",
      result: updateTodo,
    });
  } catch (error) {
    console.log(error);
  }
});

// run app server
app.listen(PORT, () => {
  console.log("API RUNNING", PORT);
});
