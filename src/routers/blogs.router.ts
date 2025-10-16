import { Router } from "express";
import {
  createBlog,
  getBlogDetail,
  getBlogs,
} from "../controllers/blogs.controller";

const route: Router = Router();

route.post("/create", createBlog);
route.get("/all", getBlogs);
route.get("/detail/:id", getBlogDetail);

export default route;
