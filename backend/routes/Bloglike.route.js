import express from "express";
import { blogLike, likeCount } from "../controllers/BlogLike.controller.js";
import { authanticate } from "../middleware/authenticate.js";


const BlogLikeRoute = express.Router();

BlogLikeRoute.post("/like",authanticate, blogLike);
BlogLikeRoute.get("/get-like/:blogid/:userid?", likeCount);


export default BlogLikeRoute;
