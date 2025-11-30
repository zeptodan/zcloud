import { Router } from "express";
import { signup, login, logout, authenticate } from "../controllers/loginsignup.js";
import authorization from "../middleware/auth.js"
const HomeRouter = Router();
HomeRouter.post("/signup", signup);
HomeRouter.post("/login",login);
HomeRouter.get("/logout",logout);
HomeRouter.get("/auth",authorization,authenticate)
export default HomeRouter;