import { Router } from "express";
import { signup, login, logout } from "../controllers/loginsignup.js";
const HomeRouter = Router();
HomeRouter.post("/signup", signup);
HomeRouter.post("/login",login);
HomeRouter.get("/logout",logout);

export default HomeRouter;