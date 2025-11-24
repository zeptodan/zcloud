import { Router } from "express";
import { getFolder, createFolder } from "../controllers/folders";

const folderrouter = Router();

folderrouter.get("/folders/:parentid",getFolder)
folderrouter.post("/folders/:parentid",createFolder)

export default folderrouter;