import { Router } from "express";
import { signup, login, logout } from "../controllers/loginsignup";
const HomeRouter = Router();
HomeRouter.post("signup", signup);
HomeRouter.post("login",login);
HomeRouter.get("logout",logout);

export default HomeRouter;