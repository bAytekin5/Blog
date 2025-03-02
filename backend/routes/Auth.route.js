import express from "express";
import {
  GoogleLogin,
  Login,
  Logout,
  Register,
} from "../controllers/Auth.controller.js";
import { authanticate } from "../middleware/authenticate.js";

const AuthRoute = express.Router();

AuthRoute.post("/register", Register);
AuthRoute.post("/login", Login);
AuthRoute.post("/google-login", GoogleLogin);
AuthRoute.get("/logout", authanticate ,Logout);

export default AuthRoute;
