import express from "express";
import {
  addComment,
  commentCount,
  deleteComment,
  getAllComments,
  getComments,
} from "../controllers/Comment.controller.js";
import { authanticate } from "../middleware/authenticate.js";

const CommentRoute = express.Router();

CommentRoute.post("/add",authanticate, addComment);
CommentRoute.get("/get/:blogid", getComments);
CommentRoute.get("/get-count/:blogid", commentCount);
CommentRoute.get("/get-all-comment",authanticate, getAllComments);
CommentRoute.delete("/delete/:commentid",authanticate, deleteComment);

export default CommentRoute;
