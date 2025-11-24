import { Router } from "express";
import { getFile,uploadFile } from "../controllers/files.js";

const filerouter = Router();

filerouter.get("/files/:id",getFile)
filerouter.post("/files/:parentid",uploadFile)

export default filerouter;