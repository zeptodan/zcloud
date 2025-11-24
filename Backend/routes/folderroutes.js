import { Router } from "express";
import { getFolder, createFolder, deleteFolder, renameFolder } from "../controllers/folders";

const folderrouter = Router();

folderrouter.get("/folders/:parentid",getFolder)
folderrouter.post("/folders/:parentid",createFolder)
folderrouter.delete("/folders/:id",deleteFolder)
folderrouter.put("/folders/:id",renameFolder)

export default folderrouter;