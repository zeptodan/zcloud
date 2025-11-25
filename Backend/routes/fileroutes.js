import { Router } from "express";
import { getFile,uploadFile } from "../controllers/files.js";
import upload from "../middleware/multer.js";

const filerouter = Router();

filerouter.get("/files/:id",getFile)
filerouter.post("/files/:parentid",upload.single("file"),uploadFile)

export default filerouter;