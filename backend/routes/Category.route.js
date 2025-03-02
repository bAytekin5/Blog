import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  showCategory,
  updateCategory,
} from "../controllers/Category.controller.js";
import { onlyAdmin } from "../middleware/onlyadmin.js";

const CategoryRoute = express.Router();

CategoryRoute.post("/add",onlyAdmin, addCategory);
CategoryRoute.put("/update/:categoryid",onlyAdmin,  updateCategory);
CategoryRoute.get("/show/:categoryid",onlyAdmin,  showCategory);
CategoryRoute.delete("/delete/:categoryid",onlyAdmin,  deleteCategory);
CategoryRoute.get("/all-category", getAllCategory);

export default CategoryRoute;
