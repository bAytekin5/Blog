import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/User.controller.js";
import upload from "../config/multer.js";
import { authanticate } from "../middleware/authenticate.js";

const UserRoute = express.Router();

UserRoute.use(authanticate);

UserRoute.get("/get-user/:userid", getUser);
UserRoute.put("/update-user/:userid", upload.single("file"), updateUser);
UserRoute.get("/get-all-user", getAllUser);
UserRoute.delete("/delete/:userid", deleteUser);

export default UserRoute;
