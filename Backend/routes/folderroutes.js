import { Router } from "express";
import { getFolder, createFolder } from "../controllers/folders.js";

const folderrouter = Router();

folderrouter.get("/folders/:parentid",getFolder)
folderrouter.post("/folders/:parentid",createFolder)

export default folderrouter;