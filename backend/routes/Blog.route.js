import express from "express";
import {
  addBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlog,
  getBlogByCategory,
  getRelatedBlog,
  search,
  showAllBlog,
  updateBlog,
} from "../controllers/Blog.controller.js";
import upload from "../config/multer.js";
import { authanticate } from "../middleware/authenticate.js";

const BlogRoute = express.Router();

BlogRoute.post("/add", authanticate, upload.single("file"), addBlog);
BlogRoute.get("/edit/:blogid",authanticate, editBlog);
BlogRoute.put("/update/:blogid", authanticate,upload.single("file"), updateBlog);
BlogRoute.delete("/delete/:blogid",authanticate, deleteBlog);
BlogRoute.get("/get-all", authanticate, showAllBlog);


BlogRoute.get("/get-blog/:slug", getBlog);
BlogRoute.get("/get-related-blog/:category/:blog", getRelatedBlog);
BlogRoute.get("/get-blog-by-category/:category", getBlogByCategory);
BlogRoute.get("/search", search);

BlogRoute.get("/blogs",  getAllBlogs);
export default BlogRoute;
