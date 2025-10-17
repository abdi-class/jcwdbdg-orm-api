import { Router } from "express";
import {
  createBlog,
  getBlogDetail,
  getBlogs,
} from "../controllers/blogs.controller";
import { verifyToken } from "../middleware/verify";

const route: Router = Router();

route.post("/create", verifyToken, createBlog);
route.get("/all", getBlogs);
route.get("/detail/:id", getBlogDetail);

export default route;
